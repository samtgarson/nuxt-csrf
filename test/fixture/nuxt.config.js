module.exports = {
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: [
    '@@'
  ],
  csrf: {
    sessionName: 'nuxtSession',
    secretKey: 'sekret'
  }
}
