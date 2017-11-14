module.exports = (require, ctx) => {
  const path = require('path')
  const watch = require('watch')
  const complier = require('./config/complier')(require, ctx)

  return () =>
    watch.watchTree(ctx.options.src, (f, curr, prev) => {
      if (typeof f == 'object' && prev === null && curr === null) {
        // Finished walking the tree, complie all
      } else if (prev === null) {
        // f is a new file, complie all
        complier()
      } else if (curr.nlink === 0) {
        // f was removed, complie all
        complier()
      } else {
        // f was changed
        if (path.extname(f) === '.js') {
          // f is js, complie it
          complier(f)
        } else {
          // f is not js, complie all
          complier()
        }
      }
    })
}
