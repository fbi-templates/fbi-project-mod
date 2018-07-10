module.exports = {
  src: 'src',
  dist: 'dist',

  data: {
    XXX: 'xxx',
    FBI_ENV: '' // Used in `src/configs.js`
  },

  // Config for nodemon
  // Sample: https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md
  // defaults: https://github.com/remy/nodemon/blob/master/lib/config/defaults.js
  server: {
    script: 'index.js',
    ext: 'js json',
    watch: false,
    verbose: true, // for debug purpose only
    ignore: ['.git', 'node_modules', 'test', 'fbi'],
    env: {
      NODE_ENV: 'development'
    }
  },

  // Docs: https://rollupjs.org/#rollup-rollup
  rollup: {
    inputOptions: {},
    outputOptions: {
      sourcemap: true,
      banner: ''
    },
    leaveAsyncAlone: true, // compile `async await`: true => no; false => yes
    // docs: https://github.com/fabiosantoscode/terser#minify-options
    uglify: false // false or an object
  },

  // Docs: https://buble.surge.sh/guide/#options
  buble: {
    // Docs: https://buble.surge.sh/guide/#list-of-transforms
    transforms: {
      arrow: false,
      classes: false,
      defaultParameter: false,
      destructuring: false,
      forOf: false,
      generator: false,
      letConst: false,
      parameterDestructuring: false,
      spreadRest: false,
      templateString: false
    },
    objectAssign: 'Object.assign'
  },

  // ESlint config
  eslint: {
    enable: true,
    options: {
      // http://eslint.org/docs/user-guide/configuring
      rules: {
        // rules docs: https://standardjs.com/rules.html
        semi: ['error', 'never'],
        indent: ['error', 2]
      }
      // fix: true,
      // emitError: true,
      // emitWarning: true
    }
  },

  // file or directories to copy (Destination: 'dist')
  copy: {
    'package.json': true,
    node_modules: false
  },

  // https://github.com/rollup/rollup-plugin-alias
  alias: {
    services: './services'
  }
}
