const logger = require('./helpers/logger')
const server = require('./helpers/server')
const options = ctx ? ctx.options : require('./options')

ctx.cwd = process.cwd().replace(/\\/g, '/')
process.env.BUILD_ENV = 'dev'
process.env.BUILD_DIST = `${options.dist}`
logger.log('Environment:', process.env.BUILD_ENV)
logger.log('Destination:', process.env.BUILD_DIST)
process.env.NODE_ENV = 'development'

async function serve () {
  try {
    await server.start(options, process.env.BUILD_DIST, logger)
  } catch (err) {
    console.error(err)
    logger.error(err)
  }
}

try {
  if (ctx) {
    module.exports = serve
  }
} catch (err) {
  serve()
}
