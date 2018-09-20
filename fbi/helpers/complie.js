const rollup = require('rollup')
const logger = require('./logger')
const generateConfig = require('./config')

async function complier (configs) {
  return Promise.all(
    configs.map(async config => {
      const bundle = await rollup.rollup(config)
      // console.log(bundle)

      const { code, map } = await bundle.generate(config.output)
      // console.log(code, map)
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
  if (options) {
    const configs = await generateConfig(options, _file)
    await complier(configs)
  }
}
