const rm = require('rimraf')

module.exports = dir => {
  if (!dir) {
    return 'Path to remove should not be empty.'
  }
  return new Promise((resolve, reject) => {
    rm(dir, err => (err ? reject(err) : resolve()))
  })
}
