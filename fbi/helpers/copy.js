const glob = require('glob')
const path = require('path')
const fs = require('fs-extra')

function globFiles(pattern, opts = {}) {
  return new Promise((resolve, reject) => {
    glob(pattern, opts, (err, files) => (err ? reject(reject) : resolve(files)))
  })
}

module.exports = async (src, dist) => {
  const others = await globFiles('**', {
    cwd: path.join(process.cwd(), src),
    dot: true,
    nodir: true,
    ignore: ['**/*.js', '.DS_Store']
  })

  await Promise.all(
    others.map(async item => {
      await fs.copy(path.join(src, item), path.join(dist, item))
    })
  )
}
