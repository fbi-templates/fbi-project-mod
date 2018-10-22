import * as fs from 'fs'
import * as path from 'path'
import * as Router from 'koa-router'

function makeCtrls(dir: string) {
  const files = fs.readdirSync(path.join(__dirname, dir))
  return files
    .filter(f => ['.js', '.ts'].includes(path.extname(f)))
    .map(file => require(path.join(dir, file)).default)
}

export default class ApiRouter {
  router: Router

  constructor() {
    this.router = new Router({ prefix: '/api' })
    this.onRoutes()
  }

  onRoutes() {
    const ctrls = makeCtrls('../controllers')
    ctrls.map(ctrl => ctrl(this.router))
  }
}
