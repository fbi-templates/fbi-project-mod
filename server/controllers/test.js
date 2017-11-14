/**
 * 该controller提供api给客户端ajax用
 */

export default router => {

  // 该路由访问地址：http://localhost:3000/api/demo
  router.get('/demo', async ctx => {
    ctx.body = {
      code: 1,
      msg: 'success'
    }
  })
}
