const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../') }
  ],
  csrf: {
    sessionName: 'nuxtSession',
    secretKey: 'sekret'
  }
}
