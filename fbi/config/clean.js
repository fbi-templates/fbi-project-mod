module.exports = (require, ctx) => {
  const rm = require('rimraf')

  return function clean() {
    rm.sync(ctx.options.dist)
    ctx.logger.success(`deleted:   ${ctx.options.dist}`)
  }
}
