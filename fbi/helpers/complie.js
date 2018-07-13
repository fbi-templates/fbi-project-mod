const rollup = require('rollup')
const nodemon = require('nodemon')
const logger = require('./logger')
const generateRollupConfig = require('./config')

async function complier (configs) {
  return Promise.all(
    configs.map(async config => {
      const bundle = await rollup.rollup(config)
      await bundle.write(config.output)
      logger.log(
        'compile:',
        config.input.replace(ctx.cwd + '/', ''),
        '-->',
        config.output.file
      )
    })
  )
}

module.exports = async (options, _file, restart) => {
  const configs = await generateRollupConfig(options, _file)
  await complier(configs)

  if (restart) {
    nodemon.restart()
  }
}
