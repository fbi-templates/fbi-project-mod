const path = require('path')
const nodemon = require('nodemon')

module.exports = () => {
  return new Promise((resolve, reject) => {
    nodemon({
      script: path.join(ctx.options.dist, 'index.js'),
      ext: 'js json',
      watch: false, // [ ctx.options.dist ],
      verbose: true, // for debug purpose only
      ignore: ['.git', 'node_modules', 'server', 'test', 'fbi'],
      env: {
        NODE_ENV: 'development'
      }
    })

    nodemon
      .on('start', () => {
        resolve('Service started.')
      })
      .on('restart', files => {
        resolve(`Service restarted.`)
      })
      .on('quit', () => {
        reject('Service quit.')
      })
      .on('crash', () => {
        reject('Service crashed for some reason.')
      })
  })
}
