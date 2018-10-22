import * as Koa from 'koa'
import logger from '../helpers/logger'

export function logging() {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    const start = new Date().getMilliseconds()

    await next()

    const ms = new Date().getMilliseconds() - start

    /*
    const levels = {
      error: 0,
      warn: 1,
      info: 2,
      verbose: 3,
      debug: 4,
      silly: 5
    }
    */
    let logLevel: string = 'http'

    if (ctx.status >= 400) {
      logLevel = 'warn'
    }
    if (ctx.status >= 500) {
      logLevel = 'error'
    }

    const msg: string = `${ctx.method} ${ctx.originalUrl} ${
      ctx.status
    } ${ms}ms`

    logger.log(logLevel, msg)
  }
}
