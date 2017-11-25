const taskParams = ctx.task.getParams('build')
ctx.env = taskParams.t ? 'test' : taskParams.p ? 'prod' : 'dev'
ctx.options.dist += '-' + ctx.env

ctx.logger.info('Env :', ctx.env)
ctx.logger.info(`Root: ${ctx.options.dist}`)

const copy = require('./helpers/copy')
const clean = require('./helpers/clean')
const complier = require('./helpers/complier')

process.env.NODE_ENV = 'production'

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
  } catch (err) {
    ctx.logger.error(err)
  }
}
