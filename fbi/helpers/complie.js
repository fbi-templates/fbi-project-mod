const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const rollup = require('rollup')
const nodemon = require('nodemon')
const logger = require('./logger')

const pluginPrefix = 'rollup-plugin-'

function parseInputOptions(options) {
  const config = {
    plugins: [],
    onwarn: options.rollup.onwarn || function noop() {}
  }

  if (options.eslint.status === 'on') {
    config.plugins.push(
      require(pluginPrefix + 'eslint')(
        Object.assign(
          {},
          {
            formatter: require('eslint-friendly-formatter'),
            exclude: []
          },
          options.eslint.options
        )
      )
    )
  }

  const data = Object.assign({}, options.data || {}, {
    FBI_ENV: process.env.BUILD_ENV
  })

  // https://github.com/rollup/rollup-plugin-replace#options
  config.plugins.push(require(pluginPrefix + 'replace')(data))

  const plugins = options.rollup.input.plugins
  if (plugins) {
    Object.keys(plugins).map(item => {
      config.plugins.push(require(pluginPrefix + item)(plugins[item] || {}))
    })
  }

  if (!options.rollup.leaveAsyncAlone) {
    config.plugins.push(require(pluginPrefix + 'async')())
    config.plugins.push(require(pluginPrefix + 'buble')(options.buble))
  }

  delete options.rollup.input.plugins

  return Object.assign({}, config, options.rollup.input)
}

function getEntry(dir) {
  const jsFiles = glob.sync(path.join(dir, '/**/*.js'))
  return jsFiles
}

function getFileSize(filename) {
  const stats = fs.statSync(filename)
  const fileSizeInBytes = stats['size']
  return (fileSizeInBytes / 1000).toFixed(3) + 'kb'
}

async function complier(inputOptions, options, file) {
  inputOptions['input'] = file
  const dist = path.join(process.env.BUILD_DIST, file.replace(options.src, ''))
  const outputOptions = Object.assign(options.rollup.output, {
    file: dist
  })

  // Docs: https://rollupjs.org/#rollup-rollup
  // https://rollupjs.org/#big-list-of-options
  try {
    const bundle = await rollup.rollup(inputOptions)
    const {code, map} = await bundle.generate(outputOptions)
    await fs.outputFile(dist, code)
    if (outputOptions.sourcemap) {
      await fs.outputFile(dist + '.map', map)
    }
  } catch (err) {
    throw err
  }
}

module.exports = async (options, _file, restart) => {
  if (options) {
    let files
    const specifiedEntry = options.rollup.input.input

    if (specifiedEntry) {
      if (Array.isArray(specifiedEntry)) {
        files = specifiedEntry
      } else {
        _file = specifiedEntry
        files = [_file]
      }
    } else {
      // Get all entries
      files = getEntry(options.src)
    }

    const inputOptions = parseInputOptions(options)
    inputOptions.external = files.map(item => path.resolve(item))

    if (files.includes(_file)) {
      await complier(inputOptions, options, _file)
    } else {
      await Promise.all(
        files.map(async item => {
          await complier(inputOptions, options, item)
        })
      )
    }
    if (_file) {
      logger.log('Compiled:', _file)
    }
  }
  if (restart) {
    nodemon.restart()
  }
}
