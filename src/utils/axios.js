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
		tokenFlag,
		headers,
		opts
	} = {}) {

	var options = {
		method : type,
		url    : path,
		headers: headers && typeof headers === 'object' ? headers : {}
	};

	//检测接口权限
	var api_flag = true;

	if (api_flag === true) {
		options[type === 'get' ? 'params' : 'data'] = data;

		// 分发显示加载样式任务
		//this.$store.dispatch('show_loading');

		if (tokenFlag !== true) {
			//如果你们的后台不会接受headers里面的参数，打开这个注释，即实现token通过普通参数方式传
			// data.token = this.$store.state.user.userinfo.token;
			//options.headers.token = this.$store.state.user.userinfo.token;
		}

		//axios内置属性均可写在这里
		if (opts && typeof opts === 'object') {
			for (var f in opts) {
				options[f] = opts[f];
			}
		}

		//console.log(options);
		//发送请求  一般请求，还是表格类型的请求.因为其返回的数据结构是根据api中设定的，这里只需返回就行；
		Vue.axios(options).then((res) => {
			//console.log(res);
			fn(res.data);
			
		}).catch((err) => {
			//this.$store.dispatch('hide_loading');
			this.$message({
				showClose: true,
				message: '请求错误：Internal Server Error',
				type: 'error'
			});
			//cbs.requestError.call(this, err);
		});
	} else {
		this.$alert('您没用权限请求该接口！', '请求错误', {
			confirmButtonText: '确定',
			type             : 'warning'
		});
	}
};
