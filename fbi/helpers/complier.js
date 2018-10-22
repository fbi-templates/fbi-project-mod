const path = require('path')
const tsconfig = require('../configs/tsconfig')
const fs = require('fs-extra')

module.exports = async () => {
  const configPath = path.join(
    process.cwd(),
    'node_modules/.cache/fbi/tsconfig.json'
  )
  await fs.ensureFile(configPath)
  await fs.writeJson(configPath, tsconfig)

  const tsc = path.join(
    ctx.nodeModulesPaths[ctx.nodeModulesPaths.length - 1],
    'typescript/bin/tsc'
  )

  try {
    await ctx.utils.exec(`${tsc} --build ${configPath}`, {
      stdio: 'inherit'
    })
  } catch (err) {
    throw err
  }
  await fs.remove(path.dirname(configPath))
}
