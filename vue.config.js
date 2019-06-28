
const TerserPlugin = require('terser-webpack-plugin')  // 用于在生成环境剔除debuger和console
const path = require('path');
const resolve = dir => {
  return path.join(__dirname, dir);
};

const env = process.env.NODE_ENV
let target = process.env.VUE_APP_URL  // development和production环境是不同的
console.log("env:  "+env);
console.log("target:   "+target);

module.exports = {
  publicPath: './',
  outputDir: './dist',
  lintOnSave: false, // 关闭eslint
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8808
    // 由于本项目数据通过easy-mock和mockjs模拟，不存在跨域问题，无需配置代理;
    // proxy: { 
    //   '/v2': {
    //       target: target,
    //       changeOrigin: true
    //   }
    // }
  },
   // webpack相关配置
  chainWebpack: (config) => {
    config.entry.app = ['./src/main.js']
    config.resolve.alias
      .set('@', resolve('src'))
      .set('cps', resolve('src/components'))
    // 关闭npm run build之后，This can impact web performance 警告
    config.performance
      .set('hints', false)
  },
  configureWebpack:config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    } else {
      // 为开发环境修改配置...

    }
  },
   // 第三方插件配置
  pluginOptions: {

  }
}
