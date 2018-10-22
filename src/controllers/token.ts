import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as jsonwebtoken from 'jsonwebtoken'
import configs from '../configs'

export default (router: Router) => {
  router.get('/token', async (ctx: Koa.Context) => {
    const token = jsonwebtoken.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
      },
      configs.jwtSecret
    )
    ctx.body = { code: 0, data: token }
  })
}
