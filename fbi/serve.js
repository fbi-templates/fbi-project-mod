ctx.env = 'dev'
ctx.options.dist += `-${'dev'}`

const path = require('path')
const nodemon = require('nodemon')
const copy = require('./helpers/copy')
const clean = require('./helpers/clean')
const watch = require('./helpers/watch')
const complier = require('./helpers/complier')

// start server
function startServer() {
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

module.exports = async () => {
  try {
    ctx.logger.log('`clean` start')
    await clean(ctx.options.dist)
    ctx.logger.log('`clean` done')

    ctx.logger.log('`complier` start')
    await complier()
    ctx.logger.log('`complier` done')

    ctx.logger.log('`copy` start')
    await copy()
    ctx.logger.log('`copy` done')

    // fbi s 带参数时不启动服务（仅编译）
    // 便于 VSCode 等工具调试
    if (!ctx.taskParams) {
      await startServer()
    }

    ctx.logger.log('`watch` start')
    watch(complier)
  } catch (err) {
    ctx.logger.error(err)
  }
}
