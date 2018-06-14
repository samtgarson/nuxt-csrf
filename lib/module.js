const { resolve } = require('path')
const serverMiddleware = require('./server-middleware')

module.exports = async function module (moduleOptions) {
  const options = Object.assign({}, moduleOptions, this.options.csrf)

  // Setup middleware
  this.addServerMiddleware(serverMiddleware(options))

  // Setup store
  this.addPlugin({
    src: resolve(__dirname, '../templates/plugin.js'),
    fileName: 'nuxt-csrf.js',
    options
  })

  // Add router middleware to config
  this.options.router = this.options.router || {}
  this.options.router.middleware = this.options.router.middleware || []
  this.options.router.middleware.push('csrf')
}
