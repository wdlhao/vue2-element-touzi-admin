
import * as mUtils from '@/utils/mUtils'
import { login, logout, getInfo } from '@/api/login'  // 导入登录相关接口
import { getToken, setToken, removeToken } from '@/utils/auth'

// const types = {
//     ADD_MENU : 'ADD_MENU',
//     LOAD_ROUTES : 'LOAD_ROUTES',  
// }

const state = {
    userinfo: mUtils.getStore('userinfo') || {},
    token: getToken(),
    roles: [],
    browserHeaderTitle: mUtils.getStore({
        name: 'browserHeaderTitle'
    }) || 'NxAdmin'
}

const getters = {
    token: state => state.token,
    roles: state => state.roles,
}   

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_BROWSERHEADERTITLE: (state, action) => {
        state.browserHeaderTitle = action.browserHeaderTitle
    }
}

const actions = {
     // 登录
     Login({ commit }, userInfo) {
        const username = userInfo.username.trim()
        return new Promise((resolve, reject) => {
          login(username, userInfo.password).then(response => {
            alert(1);
            const data = response
            // 登录成功之后主要目的获取token;
            // token保存方式为：setToken,'SET_TOKEN';
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
  
      // 获取用户信息
      GetInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
          getInfo(state.token).then(response => {
            const data = response
            if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
  
      // 登出
      LogOut({ commit, state }) {
        return new Promise((resolve, reject) => {
          logout(state.token).then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('CLEAR_LOCK')
            removeToken()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
  
      // 前端 登出
      FedLogOut({ commit }) {
        return new Promise(resolve => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        })
      },

      // 动态修改权限
      ChangeRoles({ commit }, role) {
        return new Promise(resolve => {
          commit('SET_TOKEN', role)
          setToken(role)
          getInfo(role).then(response => {
            const data = response
            commit('SET_ROLES', data.roles)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve()
          })
        })
    }
    
}

export default {
    state,
    getters,
    mutations,
    actions
}