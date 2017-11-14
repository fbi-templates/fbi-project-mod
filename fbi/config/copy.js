module.exports = (require, ctx) => {
  const glob = require('glob')
  const path = require('path')
  const fs = require('fs-extra')

  return function copyOtherFiles() {
    const otFiles = glob.sync('**', {
      cwd: path.join(process.cwd(), ctx.options.src),
      dot: true,
      nodir: true,
      ignore: ['**/*.js', '.DS_Store']
    })

    // copy package.json
    // fs.copy('package.json', path.join(ctx.options.dist, 'package.json'), function (err) {
    //   if (err) return console.error(err)
    //   ctx.logger.log(`copied:    package.json`)
    // })

    // copy !js files
    otFiles.map(item => {
      fs.copy(
        path.join(ctx.options.src, item),
        path.join(ctx.options.dist, item),
        function(err) {
          if (err) return console.error(err)
          ctx.logger.log(`copied:    ${ctx.options.dist + item}`)
        }
      )
    })
  }
}
