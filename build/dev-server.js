require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
//var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context] // {}
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   //console.log(options.filter); //undefined
//  // console.log(context);  //proxy2
//   app.use(proxyMiddleware(options.filter || context, options))  //代理key-->代理obj {target:proxypath,changeOrigin:true}
// })

var context = config.dev.context
var proxypath,options,proxystr;
switch(process.env.NODE_ENV){
    case 'local':  //local-->local
          var proxypath = 'http://localhost:9092';
          break;
    case 'online':   //dev-->online
        if(context.length){
            for(var i = 0;i < context.length;i++){
               if(context[i] === '/api'){  
                    proxypath = 'http://127.0.0.1:8089/api/'  // 通过这个代理，来访问服务器端api数据
                    options = {target: proxypath,changeOrigin: true,pathRewrite:{'^/api': ''}}
                    app.use(proxyMiddleware(context[i], options))
                }else if(context[i] === '/sohu'){
                    proxypath = 'http://pv.sohu.com/sohu/'  // 代理到搜狐网站
                    options = {target: proxypath,changeOrigin: true,pathRewrite:{'^/sohu': ''}}
                    app.use(proxyMiddleware(context[i], options))
                }else if(context[i] === '/chinaz'){
                    proxypath = 'http://ip.chinaz.com/'  // 代理到搜狐网站
                    options = {target: proxypath,changeOrigin: true,pathRewrite:{'^/chinaz': ''}}
                    app.use(proxyMiddleware(context[i], options))
                }
            }
        }
        break;
}
// if (context.length) {
//     app.use(proxyMiddleware(context, options))
// }
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
