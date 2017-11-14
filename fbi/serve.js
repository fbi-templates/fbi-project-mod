ctx.options.dist += '-dev'

const path = require('path')
const copy = require('./config/copy')(require, ctx)
const clean = require('./config/clean')(require, ctx)
const watch = require('./config/watch')(require, ctx)
const complier = require('./config/complier')(require, ctx)

clean()
complier()
copy()
watch()

// fbi s 带参数时不启动服务（仅编译）
// 便于 VSCode 等工具调试
if (!ctx.taskParams) {
  startServer()
}

// start server
function startServer() {
  const nodemon = require('nodemon')
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
      ctx.logger.success('Service started')
    })
    .on('quit', () => {
      ctx.logger.warn('Service quit')
    })
    .on('restart', files => {
      ctx.logger.warn(`Service restarted`)
    })
    .on('crash', () => {
      ctx.logger.error('Service crashed for some reason')
    })
}
