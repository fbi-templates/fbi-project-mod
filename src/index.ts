import * as Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import schema from './schema'
import configs from './configs'
import logger from './helpers/logger'

const init = async () => {
  const app = new Koa()
  const server = new ApolloServer(schema)
  server.applyMiddleware({ app, path: configs.graphqlPrefix })

  const port = configs.server.port
  return app.listen({ port }, () => {
    console.log()
    logger.info(
      `🚀 Server ready at http://localhost:${port}${configs.graphqlPrefix}`
    )
  })
}

init().catch(logger.error.bind(logger))
