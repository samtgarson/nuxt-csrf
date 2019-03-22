const { resolve } = require('path')
const serverMiddleware = require('./server-middleware')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['csrf'],
    ...moduleOptions
  }

  // Setup middleware
  this.addServerMiddleware(serverMiddleware(options))

  // Setup store
  this.addPlugin({
    src: resolve(__dirname, './plugin.js'),
    fileName: 'nuxt-csrf.js',
    options
  })

  // Add router middleware to config
  this.options.router = this.options.router || {}
  this.options.router.middleware = this.options.router.middleware || []
  this.options.router.middleware.push('csrf')
}

module.exports.meta = require('../package.json')
