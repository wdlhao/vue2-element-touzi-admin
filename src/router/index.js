import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import {
    login,
} from 'page/'


const routes = [
	{
		path     : '/',
		name     : '登录',
		hidden   : true,
		component: login
	}
	
]



export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
