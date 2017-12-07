let logger = console
try {
  logger = ctx.logger
} catch (err) {}

module.exports = logger
