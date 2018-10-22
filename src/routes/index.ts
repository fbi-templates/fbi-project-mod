import * as Router from 'koa-router'
import ApiRouter from './api'

class AppRouter {
  router: Router

  constructor() {
    this.router = new Router()
    this.api()
  }

  api() {
    this.router.use(new ApiRouter().router.routes())
  }
}

const appRouter = new AppRouter()

export default appRouter.router
