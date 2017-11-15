const path = require('path')
const buble = require('rollup-plugin-buble')
const async = require('rollup-plugin-async')
const json = require('rollup-plugin-json')
const eslint = require('rollup-plugin-eslint')
const replace = require('rollup-plugin-replace')
const eslintConfig = require('./eslint.config')
const bubleConfig = require('./buble.config')

function noop() {}

const config = {
  plugins: [
    replace({
      FBI_ENV: ctx.env
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

module.exports = config

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
