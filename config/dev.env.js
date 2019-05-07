var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_BASE_URL: '"http://www.jiouai.com"',
  BASE_API:'"https://easy-mock.com/mock/5cd03667adb0973be6a3d8d1/api"'
})
