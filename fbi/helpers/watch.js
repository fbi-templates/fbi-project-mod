const path = require('path')
const fs = require('fs-extra')
const chokidar = require('chokidar')

module.exports = (options, dist, cb, logger) => {
  // Docs: https://github.com/paulmillr/chokidar
  const watcher = chokidar.watch(options.src, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  })

  watcher
    .on('change', file => {
      if (path.extname(file) === '.js') {
        cb(options, file, true)
      }
    })
    .on('unlink', async file => {
      logger.log('Deleted:', file)
      await fs.remove(
        path.join(process.cwd(), dist, file.replace(options.src, ''))
      )
      cb(null, null, true)
    })
    .on('unlinkDir', async dir => {
      logger.log('Deleted:', dir)
      await fs.remove(
        path.join(process.cwd(), dist, dir.replace(options.src, ''))
      )
      cb(null, null, true)
    })
    .on('error', error => logger.log(`Watcher error: ${error}`))
    .on('ready', () => logger.log('Initial scan complete. Ready for changes...'))
}
