import * as Koa from 'koa'
import * as jwt from 'koa-jwt'
import * as KoaBodyParser from 'koa-bodyparser'
import * as helmet from 'koa-helmet'
import * as cors from 'kcors'

import { error } from './middlewares/error'
import { logging } from './middlewares/logging'
import router from './routes/index'
import logger from './helpers/logger'
import configs from './configs'

const app = new Koa()

// Error hander
app.use(error())

// Logging middleware
app.use(logging())

// Provides important security headers to make your app more secure
app.use(helmet())

// Enable cors with default options
app.use(cors())

// Enable bodyParser with default options
app.use(KoaBodyParser())

// JWT middleware
app.use(
  jwt({ secret: configs.jwtSecret }).unless({
    path: [/\/register/, /\/login/, /\/token/]
  })
)

app.use(router.routes()).use(
  router.allowedMethods({
    throw: true
  })
)

// Listen
const port = configs.server.port || 3000
app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`)
})

export default app
