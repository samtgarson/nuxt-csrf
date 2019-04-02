const { Nuxt, Builder } = require('nuxt-edge')
const fetch = require('node-fetch')
const getPort = require('get-port')

const config = require('../example/nuxt.config')

let port = null
let nuxt = null

const url = path => `http://localhost:${port}${path}`
const get = path => fetch(url(path)).then(r => r.text())

describe('basic', () => {
  it('build and start', async () => {
    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
    port = await getPort()
    await nuxt.listen(port)
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('renders a placeholder for the token', async () => {
    const html = await get('/')
    expect(html).toContain('token')
  })
})
