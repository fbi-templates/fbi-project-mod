/**
 * `FBI_ENV` will be replaced with follows when compiled:
 * 
 * `fbi b -dev` : FBI_ENV=dev
 * `fbi b -test`: FBI_ENV=test
 * `fbi b -prod`: FBI_ENV=prod
 * `fbi s`      : FBI_ENV=dev
 */
const configs = require('./configs/env-FBI_ENV.js')

export default configs
