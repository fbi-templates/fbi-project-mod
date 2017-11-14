module.exports = (require, ctx) => {
  const path = require('path')
  const buble = require('rollup-plugin-buble')
  const async = require('rollup-plugin-async')
  const json = require('rollup-plugin-json')
  const eslint = require('rollup-plugin-eslint')
  const replace = require('rollup-plugin-replace')
  const eslintConfig = require('./config/eslint.config')(require, ctx)
  const bubleConfig = require('./config/buble.config')(require, ctx)

  const Env = ctx.taskParams ? ctx.taskParams[0] : 'dev'

  ctx.logger.log(`Env: ${Env}`)

  function noop() {}

  const config = {
    plugins: [
      replace({
        FBI_ENV: Env
      }),
      eslint(eslintConfig),
      json()
    ],
    onwarn: function() {}
  }

  if (!ctx.options.rollup.leaveAsyncAlone) {
    config.plugins.push(async())
    config.plugins.push(buble(bubleConfig))
  }

  return config
}

/* options:

  acorn
  banner
  cache
  context
  dest
  entry
  exports
  external
  footer
  format
  globals
  indent
  interop
  intro
  legacy
  moduleContext
  moduleId
  moduleName
  noConflict
  onwarn
  outro
  paths
  plugins
  preferConst
  sourceMap
  sourceMapFile
  targets
  treeshake
  useStrict

*/
