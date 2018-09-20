import demoService from '../services/demo'

export default router => {
  // GET http://localhost:3000/api/demo
  // POST http://localhost:3000/api/demo
  // PUT http://localhost:3000/api/demo/123
  // patch http://localhost:3000/api/demo/123
  // delete http://localhost:3000/api/demo/123
  router
    .get('/demo', async ctx => {
      ctx.body = {
        code: 0,
        data: await demoService.msg('demo')
      }
    })
    .post('/demo', async ctx => {
      const data = ctx.request.body
      ctx.body = {
        code: 0,
        data
      }
    })
    .put('/demo/:id', async ctx => {
      const id = ctx.params.id
      const data = ctx.request.body
      ctx.body = {
        code: 0,
        data: {
          ...data,
          id
        }
      }
    })
    .patch('/demo/:id', async ctx => {
      const id = ctx.params.id
      const data = ctx.request.body
      ctx.body = {
        code: 0,
        data: {
          ...data,
          id
        }
      }
    })
    .delete('/demo/:id', async ctx => {
      const id = ctx.params.id
      const data = ctx.request.body
      ctx.body = {
        code: 0,
        data: {
          ...data,
          id
        }
      }
    })
}
