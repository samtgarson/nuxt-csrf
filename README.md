**nuxt-csrf** _CSRF protection for your Nuxt app_

## Usage

1. Install the module
2. You will find your CSRF token in a Vuex store module
3. Send the token along with any API requests (except: `GET|HEAD|OPTIONS|TRACE`)

## Setup
- Add `nuxt-csrf` dependency using yarn or npm to your project
- Add `nuxt-csrf` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'nuxt-csrf',

    // With options
    ['nuxt-csrf', {
      sessionName: 'myCSRFSession',
      secretKey: process.env.SECRET_KEY,
      headerName: 'X-MY-CSRF-HEADER'
    }],
 ]
}
```
