import Koa from 'koa'
import configs from './configs'
import errorHandler from './middlewares/errorHandler'
import logger from 'koa-logger'
import routes from './routes/index'

const app = new Koa()

// Log & Error hander
app.use(logger())
app.use(errorHandler())

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
