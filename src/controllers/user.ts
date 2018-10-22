import * as Koa from 'koa'
import * as Router from 'koa-router'
import { UserService } from '../services/user'

const userService = new UserService()

export default (router: Router) => {
  // GET http://localhost:3000/api/users
  // POST http://localhost:3000/api/users
  // PUT http://localhost:3000/api/users/1
  // patch http://localhost:3000/api/users/1
  // delete http://localhost:3000/api/users/1
  router
    .get('/users', async (ctx: Koa.Context) => {
      ctx.body = {
        code: 0,
        data: await userService.getAll()
      }
    })
    .get('/users/:id', async (ctx: Koa.Context) => {
      const id = ctx.params.id
      ctx.body = {
        code: 0,
        data: await userService.getOne(id)
      }
    })
    .post('/users', async (ctx: Koa.Context) => {
      const data = ctx.request.body
      ctx.body = {
        code: 0,
        data: await userService.add(data)
      }
    })
    .put('/users/:id', async (ctx: Koa.Context) => {
      const id = ctx.params.id
      const data = ctx.request.body
      ctx.body = {
        code: 0,
        data: await userService.update(id, data)
      }
    })
    .patch('/users/:id', async (ctx: Koa.Context) => {
      const id = ctx.params.id
      const data = ctx.request.body
      ctx.body = {
        code: 0,
        data: await userService.update(id, data)
      }
    })
    .delete('/users/:id', async (ctx: Koa.Context) => {
      const id = ctx.params.id
      ctx.body = {
        code: 0,
        data: await userService.remove(id)
      }
    })
}
