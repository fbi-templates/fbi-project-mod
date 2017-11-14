const fs = require('fs')

module.exports = (require, ctx) => {
  const path = require('path')
  const rollup = require('rollup')
  const nodemon = require('nodemon')
  const rollupConfig = require('./config/rollup.config')(require, ctx)

  const glob = require('glob')
  const fs = require('fs-extra')

  function getEntry() {
    const jsFiles = glob.sync(path.join(ctx.options.src, '/**/*.js'))
    return jsFiles
  }

  function getFileSize(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats['size']
    return (fileSizeInBytes / 1000).toFixed(3) + 'kb'
  }

  function complier(file) {
    rollupConfig['input'] = file
    const dist = path.join(ctx.options.dist, file.replace(ctx.options.src, ''))

    return rollup
      .rollup(rollupConfig)
      .then(bundle => {
        bundle
          .write(
            Object.assign(
              {
                format: 'cjs',
                moduleName: '',
                moduleId: 'myModuleId',
                file: dist,
                sourceMap: true
              },
              ctx.options.rollup
            )
          )
          .then(() => {
            ctx.logger.log(`complied:  ${dist}  ${getFileSize(dist)}`)
          })
      })
      .catch(err => {
        throw err
      })
  }

  return async function(file) {
    let files
    let specifiedEntry = ctx.options.rollup.entry

    if (specifiedEntry) {
      // 若指定了入口文件，则只编译入口文件
      if (Array.isArray(specifiedEntry)) {
        files = specifiedEntry
      } else {
        file = specifiedEntry
        files = [file]
      }
    } else {
      // 若没指定入口文件，则编译所有js文件
      files = getEntry()
    }

    // 配置external 目的是分开输出入口文件
    rollupConfig.external = files.map(item => path.resolve(item))

    if (files.includes(file)) {
      // 在入口文件列表里的文件才会单独编译
      complier(file)
    } else {
      await Promise.all(
        files.map(async item => {
          await complier(item)
        })
      )
    }
    // 重启fbi s 时启动的监控服务
    nodemon.emit('restart')
  }
}
