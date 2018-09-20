const path = require('path')
const nodemon = require('nodemon')

function processHandler () {
  process.stdin.resume() // so the program will not close instantly

  function exitHandler () {
    process.exit()
    process.kill(0)
    nodemon.emit('quit')
  }

  // do something when app is closing
  process.on('exit', exitHandler)

  // catches ctrl+c event
  process.on('SIGINT', exitHandler)

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler)
  process.on('SIGUSR2', exitHandler)

  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler)
}

// https://github.com/remy/nodemon
function start (options, dist, logger) {
  return new Promise((resolve, reject) => {
    processHandler()
    options.server.ignore = options.server.ignore || []
    options.server.script = path.join(dist, options.server.script)
    options.server.ignore.push(options.src)

    if (options.server.inspect) {
      options.server['exec'] = `node --inspect`
    } else {
      options.server['watch'] = false
      delete options.server['exec']
    }

    nodemon(options.server)

    nodemon
      .on('start', () => {
        logger.warn('Service started.')
        resolve()
      })
      .on('restart', () => {
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

function restart () {
  nodemon.restart()
}

module.exports = {
  start,
  restart
}
