import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import user from './modules/user'
import permission from './modules/permission'
import money from './modules/money'



import page from './page/';
import menu from './menu/';


export default new Vuex.Store({
    modules: {
        user,
        permission,
        money,
        page,
        menu
    }
});

