var asyncToGen = require('async-to-gen')
var createFilter = require('rollup-pluginutils').createFilter

module.exports = function (options) {
  options = options || {}
  var filter = createFilter(options.include, options.exclude)
  var sourceMap = options.sourceMap !== false

  return {
    name: 'async-to-gen',
    transform: function (code, id) {
      if (filter(id)) {
        var result = asyncToGen(code, {
          sourceMap: sourceMap,
          includeHelper: false
        })
        if (result.isEdited) {
          result.prepend(
            'import { __async, __asyncGen, __asyncIterator } from "\0async-runtime"\n'
          )
        }
        return {
          code: result.toString(),
          map: sourceMap
            ? result.generateMap()
            : {
              mappings: ''
            }
        }
      }
    },
    resolveId: function (id) {
      if (id === '\0async-runtime') {
        return id
      }
    },
    load: function (id) {
      if (id === '\0async-runtime') {
        return (
          'export ' +
          asyncToGen.asyncHelper +
          '\n' +
          'export ' +
          asyncToGen.asyncGenHelper +
          '\n' +
          'export ' +
          asyncToGen.asyncIteratorHelper
        )
      }
    }
  }
}
