module.exports = name => {
  const def = name === 'build' ? 'prod' : 'dev'
  try {
    const taskParams = ctx.task.getParams(name)
    if (taskParams) {
      return taskParams.t || taskParams.test
        ? 'test'
        : taskParams.p || taskParams.prod ? 'prod' : def
    } else {
      return ''
    }
  } catch (err) {
    const argvs = process.argv.slice(2)
    if (argvs.length > 0 && (argvs.includes('-t') || argvs.includes('-test'))) {
      return 'test'
    }
    return def
  }
}
