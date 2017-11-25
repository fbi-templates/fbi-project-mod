ctx.env = 'dev'
ctx.options.dist += `-${'dev'}`

const path = require('path')
const nodemon = require('nodemon')
const copy = require('./helpers/copy')
const clean = require('./helpers/clean')
const watch = require('./helpers/watch')
const complier = require('./helpers/complier')
const server = require('./helpers/server')

module.exports = async () => {
  try {
    ctx.logger.log('`clean` start...')
    await clean(ctx.options.dist)
    ctx.logger.log('`clean` done!')

    ctx.logger.log('`complier` start...')
    await complier()
    ctx.logger.log('`complier` done!')

    ctx.logger.log('`copy` start...')
    await copy()
    ctx.logger.log('`copy` done!')

    // fbi s 带参数时不启动服务（仅编译）
    // 便于 VSCode 等工具调试
    const taskParams = ctx.task.getParams('serve')
    if (Object.keys(taskParams).length < 1) {
      await server()
    }

    ctx.logger.log('`watch` start...')
    watch(complier)
  } catch (err) {
    ctx.logger.error(err)
  }
}
