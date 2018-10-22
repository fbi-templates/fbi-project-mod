/**
 * `fbi b -dev` : process.env.NODE_ENV=development
 * `fbi b -test`: process.env.NODE_ENV=testing
 * `fbi b -prod`: process.env.NODE_ENV=production
 * `fbi s`      : process.env.NODE_ENV=development
 */
const { config } = require(`./configs/env-${process.env.NODE_ENV}`)

export default config
