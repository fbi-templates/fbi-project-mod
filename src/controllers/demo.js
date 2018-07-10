import demoService from '../services/demo'

export default router => {
  // http://localhost:3000/api/demo
  router.get('/demo', async ctx => {
    ctx.body = {
      code: 0,
      data: await demoService.msg('demo')
    }
  })
}
