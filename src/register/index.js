/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import _ from 'underscore';
import libs from './lib.js';


/**
 * 把一些全局对象和一些全局方法，注册到Vue原型上
 */
Vue.use({
    install(Vue, options) {
        //注册第三方库
        _.each(libs, (item, key) => {
            Vue.prototype['$$' + key] = item;
        });
       
    }
});





