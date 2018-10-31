import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

// 导入封装的回调函数
import {
	cbs,
	gbs
} from 'config/';

// 动态设置本地和线上接口域名
Vue.axios.defaults.baseURL = gbs.host; 

/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数
 * @param  {boolean}   tokenFlag 是否需要携带token参数，为true，不需要；false，需要。一般除了登录，都需要
 */
export default function ({
		type,
		path,
		data,
		fn,
		errFn,
		headers,
		opts
	} = {}) {
		var options = {
			method : type,
			url    : path,
			headers: headers && typeof headers === 'object' ? headers : {}
		};
		options[type === 'get' ? 'params' : 'data'] = data;

		//axios内置属性均可写在这里
		if (opts && typeof opts === 'object') {
			for (var f in opts) {
				options[f] = opts[f];
			}
		}

		//发送请求  一般请求，还是表格类型的请求.因为其返回的数据结构是根据api中设定的，这里只需返回就行；
		Vue.axios(options).then((res) => {
			fn(res.data);
		}).catch((error) => {
			errFn(error);
		});
} 
