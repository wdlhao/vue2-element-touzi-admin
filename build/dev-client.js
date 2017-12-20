/* eslint-disable */
require('eventsource-polyfill')  //用于保证在老的浏览器中ES6的语法可用;
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
