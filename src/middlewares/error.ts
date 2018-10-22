import * as Koa from 'koa'

export function error() {
  return async (ctx: Koa.Context, next: Function) => {
    try {
      await next()
    } catch (err) {
      const message =
        ctx.status === 401
          ? 'Protected resource, use Authorization header to get access'
          : err.message
      ctx.app.emit('error', err, ctx)
      ctx.status = 200
      ctx.type = 'application/json'
      ctx.body = { code: -1, message: message }
    }
  }
}
