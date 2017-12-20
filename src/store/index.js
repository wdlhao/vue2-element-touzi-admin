import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import user from './user/';
import page from './page/';
import menu from './menu/';


export default new Vuex.Store({
    modules: {
        user,
        page,
        menu
    }
});

