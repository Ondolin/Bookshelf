module.exports = {
  root: true,
  env: {
    browser: true,
    node: false
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
  }
}
