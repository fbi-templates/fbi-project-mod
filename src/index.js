import Koa from 'koa'
import Promise from 'bluebird'
import configs from './configs'
import errorHandler from './middlewares/errorHandler'
import logger from 'koa-logger'
import routes from './routes/index'

global.Promise = Promise
const app = new Koa()

app.use(logger())
app.use(errorHandler())

const router = routes()
app.use(router.routes()).use(
  router.allowedMethods({
    throw: true
  })
)

const port = configs.server.port || 3000
app.listen(port, async err => {
  if (err) {
    throw err
  }
  console.log(`Server started at http://localhost:${port}`)
})

export default app
