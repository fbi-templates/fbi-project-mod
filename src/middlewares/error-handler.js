export default () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.app.emit('error', err, ctx)
      ctx.status = 200
      ctx.type = 'application/json'
      ctx.body = {
        code: -1,
        message: err.message
      }
    }
  }
}
