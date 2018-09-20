const path = require('path')
const fs = require('fs-extra')
const chokidar = require('chokidar')

module.exports = (options, dist, cb, logger) => {
  // Docs: https://github.com/paulmillr/chokidar
  const watcher = chokidar.watch(options.src, {
    ignored: options.watcher.ignore,
    persistent: true
  })

  watcher
    .on('all', async (event, file) => {
      // console.log(event, file)
      switch (event) {
        case 'change':
          cb(file, true)
          break
        case 'unlink':
        case 'unlinkDir':
          logger.log('Deleted:', file)
          await fs.remove(
            path.join(ctx.cwd, dist, file.replace(options.src, ''))
          )
          cb(null, true)
          break
        default:
          break
      }
    })
    .on('error', error => logger.log(`Watcher error: ${error}`))
    .on('ready', () =>
      logger.log('Initial scan complete. Ready for changes...')
    )
}
