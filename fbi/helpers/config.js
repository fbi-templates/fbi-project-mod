const path = require('path')
const globby = require('globby')
const pluginJson = require('rollup-plugin-json')
const pluginEslint = require('rollup-plugin-eslint')
const pluginCommonjs = require('rollup-plugin-commonjs')
const pluginAsync = require('rollup-plugin-async')
const pluginBuble = require('rollup-plugin-buble')
const pluginReplace = require('rollup-plugin-replace')
const pluginResolve = require('rollup-plugin-node-resolve')
const pluginTerser = require('rollup-plugin-terser')

const noop = function () {}

async function generateConfig (opts, files) {
  if (!opts) {
    logger.warn('Please restart the compile task')
  }

  const data = Object.assign({}, opts.data || {}, {
    FBI_ENV: process.env.BUILD_ENV
  })

  const inputOptions = Object.assign(opts.rollup.inputOptions, {
    plugins: [
      pluginJson({
        preferConst: true,
        indent: '  '
      }),
      pluginResolve(),
      pluginCommonjs(),
      pluginReplace(data)
    ],
    onwarn: opts.rollup.onwarn || noop
  })

  if (opts.eslint.enable) {
    inputOptions.plugins.unshift(
      pluginEslint(
        Object.assign(
          {},
          {
            root: true,
            parser: 'babel-eslint',
            parserOptions: {
              ecmaVersion: 8,
              sourceType: 'module',
              ecmaFeatures: {
                experimentalObjectRestSpread: true
              }
            },
            env: {
              node: true
            },
            formatter: require('eslint-friendly-formatter'),
            extends: 'standard',
            cache: true
          },
          opts.eslint.options
        )
      )
    )
  }

  if (opts.rollup.uglify) {
    inputOptions.plugins.push(pluginTerser.terser(opts.rollup.uglify || {}))
  }

  if (!opts.rollup.leaveAsyncAlone) {
    config.plugins.push(pluginAsync())
    config.plugins.push(pluginBuble(opts.buble))
  }

  const outputOptions = Object.assign(opts.rollup.outputOptions, {
    format: 'cjs',
    sourcemap: opts.rollup.outputOptions.sourcemap,
    banner: opts.rollup.outputOptions.sourcemap
      ? `require('source-map-support').install();\n ${opts.rollup.outputOptions.banner}`
      : opts.rollup.outputOptions.banner
  })

  let entryFiles = files
    ? Array.isArray(files) ? files : [files]
    : await globby(path.join(ctx.cwd, opts.src, '**/*.js'))

  return entryFiles.map(entry => {
    const distFile = path.join(
      process.env.BUILD_DIST || 'dist',
      entry.replace(ctx.cwd, '').replace(opts.src, '')
    )
    const entryRelativePath = entry.replace(ctx.cwd, '')
    return {
      ...inputOptions,
      input: entry,
      output: {
        ...outputOptions,
        file: distFile
      },
      external: id => !new RegExp(entryRelativePath.replace(/\\/g, '/') + '$').test(id.replace(/\\/g, '/'))
    }
  })
}

module.exports = generateConfig
