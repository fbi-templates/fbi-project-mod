const globby = require('globby')
const path = require('path')
const fs = require('fs-extra')
const logger = require('./logger')

module.exports = async (src, dist, opts) => {
  const others = await globby('**', {
    cwd: path.join(process.cwd(), src),
    dot: true,
    nodir: true,
    ignore: ['**/*.js', '.DS_Store', 'configs/pm2-*.json']
  })

  await Promise.all(
    others.map(async item => {
      await fs.copy(path.join(src, item), path.join(dist, item))
      logger.log('copy:', path.join(src, item), '-->', path.join(dist, item))
    })
  )

  // env config file
  const configPath = path.join(src, `configs/pm2-${process.env.BUILD_ENV}.json`)
  const configDistPath = path.join(dist, 'pm2.json')
  const configsExist = await fs.pathExists(configPath)
  if (configsExist) {
    await fs.copy(configPath, configDistPath)
    logger.log('copy:', configPath, '-->', configDistPath)
  }

  // package.json
  if (opts.copy['package.json']) {
    const pkgPath = 'package.json'
    const pkgDistPath = path.join(dist, 'package.json')
    const pkgsExist = await fs.pathExists(pkgPath)
    if (pkgsExist) {
      const pkg = require(path.join(process.cwd(), pkgPath))
      delete pkg.devDependencies
      await fs.outputJson(pkgDistPath, pkg, {
        spaces: '  '
      })
      logger.log('copy:', pkgPath, '-->', pkgDistPath)
    }
  }

  // node_modules
  if (opts.copy['node_modules']) {
    const nmPath = 'node_modules'
    const nmDistPath = path.join(dist, 'node_modules')
    const nmsExist = await fs.pathExists(nmPath)
    if (nmsExist) {
      await fs.copy(nmPath, nmDistPath)
      logger.log('copy:', nmPath, '-->', nmDistPath)
    }
  }
}
