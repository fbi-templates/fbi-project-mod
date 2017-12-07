const path = require('path')
const nodemon = require('nodemon')
const logger = require('./helpers/logger')
const copy = require('./helpers/copy')
const clean = require('./helpers/clean')
const watch = require('./helpers/watch')
const server = require('./helpers/server')

let justWatch
try {
  if (ctx) {
    const taskParams = ctx.task.getParams('serve')
    justWatch = Object.keys(taskParams).length > 0
  }
} catch (err) {
  justWatch = process.argv.slice(2).length > 0
}

const options = require('./options')

process.env.BUILD_ENV = 'dev'
process.env.BUILD_DIST = `${options.dist}-${process.env.BUILD_ENV}`
logger.log('Destination:', process.env.BUILD_DIST)
process.env.NODE_ENV = 'development'

const complie = require('./helpers/complie')

async function serve() {
  try {
    logger.log('Start cleaning up...')
    await clean(process.env.BUILD_DIST)
    logger.info('Clean done!')

    logger.log('Start compiling...')
    await complie(options)
    logger.info('Compile done!')

    logger.log('Start copying...')
    await copy(options.src, process.env.BUILD_DIST)
    logger.info('Copy done!')

    // VSCode debug
    if (!justWatch) {
      await server(options, process.env.BUILD_DIST, logger)
    }

    logger.log('Start watching...')
    watch(options, process.env.BUILD_DIST, complie, logger)
  } catch (err) {
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
