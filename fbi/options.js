module.exports = {
  src: 'src',
  dist: 'dist',

  data: {
    XXX: 'xxx',
    FBI_ENV: '' // Used in `server/configs.js`
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
    input: {
      input: '',
      plugins: {
        // https://github.com/rollup/rollup-plugin-json#usage
        json: {}
      }
    },
    output: {
      file: '',
      format: 'cjs', // 'amd', 'cjs', 'es', 'iife', 'umd'
      sourcemap: true,
      banner: `require('source-map-support').install();`
    },
    leaveAsyncAlone: true // compile `async await`: true => no; false => yes
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
    status: 'on', // `on`: turn on; others: turn off
    options: {
      // code style: https://github.com/airbnb/javascript
      // Docs: http://eslint.org/docs/user-guide/configuring
      // Plugin Docs: https://github.com/TrySound/rollup-plugin-eslint
      extends: 'airbnb-base',
      env: {
        node: true
      },
      include: [],
      exclude: [],
      throwOnError: false,
      throwOnWarning: false,
      parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
          experimentalObjectRestSpread: true
        }
      },
      rules: {
        semi: ['error', 'never'],
        indent: [
          'error',
          2,
          {
            SwitchCase: 1
          }
        ],
        'linebreak-style': 0,
        quotes: ['error', 'single'],
        'arrow-parens': [2, 'as-needed'],
        'space-before-function-paren': 0,
        'one-var': 0,
        'comma-dangle': 0,
        'no-console': [0],
        'no-param-reassign': [0], // https://github.com/airbnb/javascript#functions--mutate-params
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
      }
    }
  }
}
