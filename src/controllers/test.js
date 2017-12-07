export default router => {
  // http://localhost:3000/api/demo
  router.get('/demo', async ctx => {
    ctx.body = {
      code: 1,
      msg: 'success!!'
    }
  })
}
