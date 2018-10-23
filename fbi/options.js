module.exports = {
  src: 'src',
  dist: 'dist',

  nodemon: {
    inspect: false
  },

  // file or directories to copy (Destination: 'dist')
  copy: {
    'package.json': true,
    node_modules: false,
    ignore: ['**/*.{js,ts}', '.DS_Store', 'configs/pm2-*.json', 'types/**/*']
  }
}
