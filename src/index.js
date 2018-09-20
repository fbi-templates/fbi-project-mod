import Koa from 'koa'
import logger from 'koa-logger'
import bodyparser from 'koa-bodyparser'
import configs from './configs'
import errorHandler from './middlewares/error-handler'
import routes from './routes/index'

const app = new Koa()

// Log & Error hander
app.use(logger())
app.use(errorHandler())
app.use(bodyparser())

const router = routes()
app.use(router.routes()).use(
  router.allowedMethods({
    throw: true
  })
)

// Listen
const port = configs.server.port || 3000
app.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`Server started at http://localhost:${port}`)
})

export default app
