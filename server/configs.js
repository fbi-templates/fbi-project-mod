/**
 * FBI_ENV 为 FBI构建时产生的变量，构建前会替换该值
 * 如：
 * 执行`fbi b -dev` 时 FBI_ENV=dev
 * 执行`fbi b -test` 时 FBI_ENV=test
 * 执行`fbi b -prod` 时 FBI_ENV=prod
 *
 * 用途：根据命令行构建参数，自动选择对应的配置
 */
const configs = require('./configs/env-FBI_ENV.js')

export default configs