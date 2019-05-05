
import * as mUtils from '@/utils/mUtils'
import { login, logout, getInfo } from '@/api/login'  // 导入登录相关接口
import { getToken, setToken, removeToken } from '@/utils/auth'

// const types = {
//     ADD_MENU : 'ADD_MENU',
//     LOAD_ROUTES : 'LOAD_ROUTES',  
// }

const state = {
    userinfo: mUtils.getStore('userinfo') || {},
    token: getToken()
}

const getters = {
    token: state => state.token
}   

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
}

const actions = {
    // 登录
    Login({ commit }, userInfo) {
        const username = userInfo.username.trim()
        return new Promise((resolve, reject) => {
            login(username, userInfo.password).then(response => {
                const data = response
                setToken(data.token)
                commit('SET_TOKEN', data.token)
                // 只获取到了token,没有权限列表
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
  
}

export default {
    state,
    getters,
    mutations,
    actions
}