const path = require('path')
const fs = require('fs-extra')
const logger = require('./helpers/logger')
const copy = require('./helpers/copy')
const clean = require('./helpers/clean')
const watch = require('./helpers/watch')
const server = require('./helpers/server')
const options = ctx ? ctx.options : require('./options')

ctx.cwd = process.cwd().replace(/\\/g, '/')
process.env.BUILD_ENV = 'dev'
process.env.BUILD_DIST = `${options.dist}`
logger.log('Environment:', process.env.BUILD_ENV)
logger.log('Destination:', process.env.BUILD_DIST)
process.env.NODE_ENV = 'development'

const complie = require('./helpers/complie')

async function serve () {
  try {
    logger.log('Start cleaning up...')
    await clean(process.env.BUILD_DIST)
    logger.info('Clean done!')

    logger.log('Start compiling...')
    await complie(options)
    logger.info('Compile done!')

    logger.log('Start copying...')
    await copy(options.src, process.env.BUILD_DIST, options)
    logger.info('Copy done!')

    await server.start(options, process.env.BUILD_DIST, logger)

    logger.log('Start watching...')
    watch(
      options,
      process.env.BUILD_DIST,
      async (file, restart) => {
        if (file) {
          if (path.extname(file) === '.js') {
            await complie(options, file)
          } else {
            console.log(path.basename(file))
            await fs.copy(
              file,
              path.join(options.dist, file.replace(options.src, ''))
            )
          }
        }
        if (restart) {
          server.restart()
        }
      },
      logger
    )
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
