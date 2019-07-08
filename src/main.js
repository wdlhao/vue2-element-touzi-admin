import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'mini'});

import './components/iconSvg' // iconSvg

Vue.config.productionTip = false;
import '@/permission' // permission control

import './mockjs'  //引用mock

// 分享功能集合
import { shareConfig } from './utils/share';
Vue.prototype.shareConfig = shareConfig;





new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
