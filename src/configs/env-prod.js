import * as utils from '../helpers/utils.js'

import baseConfig from './base.js'

const config = utils.deepMerge(baseConfig, {
  server: {
    port: 5000
  }
})

export default config
