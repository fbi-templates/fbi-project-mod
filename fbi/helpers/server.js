const path = require('path')
const nodemon = require('nodemon')

// https://github.com/remy/nodemon
module.exports = (options, dist, logger) => {
  return new Promise((resolve, reject) => {
    options.server.ignore = options.server.ignore || []
    options.server.script = path.join(dist, options.server.script)
    options.server.ignore.push(options.src)

    nodemon(options.server)

    nodemon
      .on('start', () => {
        logger.warn('Service started.')
        resolve()
      })
      .on('restart', files => {
        logger.warn('Service restarted.')
        resolve()
      })
      .on('quit', () => {
        logger.warn('Service quit.')
        reject()
      })
      .on('crash', () => {
        logger.error('Service crashed for some reason.')
        reject()
      })
  })
}
