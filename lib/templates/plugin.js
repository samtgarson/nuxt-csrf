import middleware from '@@/.nuxt/middleware'

const moduleName = 'csrf'

const initStore = context => {
  if (context.isClient) return
  context.store.registerModule(moduleName, {
    namespaced: true,
    state: {
      token: (context.req && context.req.csrfToken)
    }
  })
}

middleware.csrf = async context => {
  initStore(context)
}
