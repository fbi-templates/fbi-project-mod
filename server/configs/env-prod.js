import * as utils from '../helpers/utils.js'

import baseConfig from './base.js'

const devConfig = utils.deepMerge(baseConfig, {

  server: {
    port: 5000
  },
})

export default devConfig