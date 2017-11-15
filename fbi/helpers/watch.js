const path = require('path')
const watch = require('watch')

module.exports = cb => {
  watch.watchTree(ctx.options.src, (f, curr, prev) => {
    if (typeof f == 'object' && prev === null && curr === null) {
      // Finished walking the tree, complie all
    } else if (prev === null) {
      // f is a new file, complie all
      cb()
    } else if (curr.nlink === 0) {
      // f was removed, complie all
      cb()
    } else {
      // f was changed
      if (path.extname(f) === '.js') {
        // f is js, complie it
        cb(f)
      } else {
        // f is not js, complie all
        cb()
      }
    }
  })
}
