const glob = require('glob')
const path = require('path')
const fs = require('fs-extra')

function globFiles(pattern, options = {}) {
  return new Promise((resolve, reject) => {
    glob(
      pattern,
      options,
      (err, files) => (err ? reject(reject) : resolve(files))
    )
  })
}

module.exports = async () => {
  const others = await globFiles('**', {
    cwd: path.join(process.cwd(), ctx.options.src),
    dot: true,
    nodir: true,
    ignore: ['**/*.js', '.DS_Store']
  })

  await Promise.all(
    others.map(async item => {
      await fs.copy(
        path.join(ctx.options.src, item),
        path.join(ctx.options.dist, item)
      )

      ctx.logger.log(
        `copied:    ${ctx.options.dist.replace('./', '') + '/' + item}`
      )
    })
  )
}
