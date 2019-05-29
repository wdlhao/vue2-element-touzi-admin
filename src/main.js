import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'mini'});

Vue.config.productionTip = false;
import '@/permission' // permission control

import './mockjs'  //引用mock

new Vue({
	el: '#app',
	router,
  store,
	template: '<App/>',
	components: { App }
})
