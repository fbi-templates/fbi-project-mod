const path = require('path')
const globby = require('globby')
const pluginJson = require('rollup-plugin-json')
const { eslint } = require('rollup-plugin-eslint')
const pluginCommonjs = require('rollup-plugin-commonjs')
const pluginAsync = require('../plugins/rollup-plugin-async')
const pluginBuble = require('rollup-plugin-buble')
const pluginReplace = require('rollup-plugin-replace')
const pluginResolve = require('rollup-plugin-node-resolve')
const pluginTerser = require('rollup-plugin-terser')
const logger = require('./logger')

const noop = function () {}

async function generateConfig (opts, files) {
  if (!opts) {
    logger.warn('Please restart the compile task')
  }

  const data = {
    ...(opts.data || {}),
    ...{
      FBI_ENV: process.env.BUILD_ENV
    }
  }

  const inputOptions = {
    ...opts.rollup.inputOptions,
    ...{
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
    }
  }

  if (opts.eslint.enable) {
    inputOptions.plugins.unshift(
      eslint({
        ...{
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
        ...opts.eslint.options
      })
    )
  }

  if (!opts.rollup.leaveAsyncAlone) {
    inputOptions.plugins.push(
      pluginAsync({
        sourcemap: opts.rollup.outputOptions.sourcemap || false
      })
    )
    inputOptions.plugins.push(pluginBuble(opts.buble))
  }

  if (opts.rollup.uglify) {
    inputOptions.plugins.push(pluginTerser.terser(opts.rollup.uglify || {}))
  }

  const outputOptions = {
    ...opts.rollup.outputOptions,
    ...{
      format: 'cjs',
      sourcemap: opts.rollup.outputOptions.sourcemap,
      banner: opts.rollup.outputOptions.banner
    }
  }

  let entryFiles = files
    ? Array.isArray(files)
      ? files
      : [files]
    : (await globby('**/*.js', {
      cwd: path.join(ctx.cwd, opts.src)
    })).map(item => path.join(ctx.cwd, opts.src, item))

  return entryFiles.map(entry => {
    // The path separator of Windows System is '\', it should be replace to '/'
    let entry2 = entry.replace(/\\/g, '/')
    const distFile = path.join(
      process.env.BUILD_DIST || 'dist',
      entry2.replace(ctx.cwd, '').replace(opts.src, '')
    )
    const entryRelativePath = entry2.replace(ctx.cwd, '')
    return {
      ...inputOptions,
      input: entry2,
      output: {
        ...outputOptions,
        file: distFile
      },
      external: id =>
        id !== '\0async-runtime' &&
        !new RegExp(entryRelativePath.replace(/\\/g, '/') + '$').test(id.replace(/\\/g, '/'))
    }
  })
}

module.exports = generateConfig
