import middleware from '@/.nuxt/middleware'

const moduleName = 'csrf'

export default async function (context) {
  const initStore = context => {
    if (process.client) return
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
}
