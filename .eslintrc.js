module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: 'standard',
  plugins: [
    'jest',
    'vue'
  ],
  rules: {
    'arrow-parens': 0,
    'no-debugger': 1,
    'no-console': 1
  },
  globals: {
    'jest/globals': true
  }
}
