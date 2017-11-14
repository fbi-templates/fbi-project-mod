if (ctx.taskParams && ctx.taskParams.length) {
  ctx.options.dist += '-' + ctx.taskParams[0] || 'dev'
} else {
  ctx.options.dist += '-dev'
}

const copy = require('./config/copy')(require, ctx)
const clean = require('./config/clean')(require, ctx)
const complier = require('./config/complier')(require, ctx)

process.env.NODE_ENV = 'production'
clean()
complier()
copy()
