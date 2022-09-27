import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});
import('element-ui/lib/theme-chalk/index.css')

import './components/iconSvg' 

import '@/permission' // permission control

import '@/mockjs'; //  mock数据

// i18n国际化
import i18n from "@/lang";

// 分享功能集合
import { shareConfig } from './utils/share';
Vue.prototype.shareConfig = shareConfig;


Vue.config.productionTip = false;

// 字体图标线上地址,在index中使用cdn载入;
//at.alicdn.com/t/font_1258069_e40c6mwl0x8.js

new Vue({
  router,
  store,
  i18n,  // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: h => h(App),
}).$mount('#app')
