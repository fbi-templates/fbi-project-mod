const path = require('path')

const resolve = dir => path.join(process.cwd(), dir)

module.exports = {
  src: 'src',
  dist: 'dist',

  typescript: {
    check: true,
    clean: true,
    verbosity: 1,
    cacheRoot: resolve('node_modules/.cache/.rts2_cache')
  },

  // file or directories to copy (Destination: 'dist')
  copy: {
    'package.json': true,
    node_modules: false,
    ignore: ['**/*.{js,ts}', '.DS_Store', 'configs/pm2-*.json', 'types/**/*']
  }
}
