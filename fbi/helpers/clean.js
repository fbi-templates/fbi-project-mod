const rm = require('rimraf')
const logger = require('./logger')

module.exports = dir => {
  if (!dir) {
    return 'Path to remove should not be empty.'
  }
  return new Promise((resolve, reject) => {
    rm(dir, err => {
      if (err) {
        reject(err)
      }
      logger.log('clean:', dir)
      resolve()
    })
  })
}
