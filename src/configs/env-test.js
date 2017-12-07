import * as utils from '../helpers/utils.js'

import baseConfig from './base.js'

const devConfig = utils.deepMerge(baseConfig, {

  server: {
    port: 4000
  },
})

export default devConfig