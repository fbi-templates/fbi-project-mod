import Router from 'koa-router'
import requireDirectory from 'require-directory'

const ctrls = requireDirectory(module, '../controllers')

export default class ApiRouter {

  constructor() {
    this.router = new Router({
      prefix: '/api'
    })
    this.onRoutes()
  }

  onRoutes() {
    Object.keys(ctrls).map(name => ctrls[name](this.router))
  }

}