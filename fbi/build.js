const logger = require('./helpers/logger')
const copy = require('./helpers/copy')
const clean = require('./helpers/clean')
const getEnv = require('./helpers/get-env')
const options = require('./options')

process.env.BUILD_ENV = getEnv('build') || 'prod'
process.env.BUILD_DIST = `${options.dist}-${process.env.BUILD_ENV}`
logger.log('Destination:', process.env.BUILD_DIST)
process.env.NODE_ENV = 'production'

const complie = require('./helpers/complie')

async function build() {
  try {
    logger.log('Start cleaning up...')
    await clean(process.env.BUILD_DIST)
    logger.info('Clean done!')

    logger.log('Start compiling...')
    await complie(options)
    logger.info('Complie done!')

    logger.log('Start copying...')
    await copy(options.src, process.env.BUILD_DIST)
    logger.info('Copy done!')
  } catch (err) {
    logger.error(err)
  }
}

try {
  if (ctx) {
    module.exports = build
  }
} catch (err) {
  build()
}
