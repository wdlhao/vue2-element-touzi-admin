
import * as mUtils from '@/utils/mUtils'
import { login, logout, getInfo } from '@/api/login'  // 导入登录相关接口
import { getUserList } from '@/api/user'  // 导入用户信息相关接口
import { getToken, setToken, removeToken } from '@/utils/auth'


const user  = {
  state : {
    name:'',
    avatar:'',
    token: getToken(),
    roles: [],
    browserHeaderTitle: mUtils.getStore('browserHeaderTitle') || '小爱Admin'
  },
  getters : {
    token: state => state.token,
    roles: state => state.roles,
    avatar: state => state.avatar,
    name: state => state.name,
    browserHeaderTitle: state => state.browserHeaderTitle,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_BROWSERHEADERTITLE: (state, action) => {
        state.browserHeaderTitle = action.browserHeaderTitle
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
  },
  actions:{
       // 登录
      Login({ commit }, userInfo) {
        const username = userInfo.username.trim()
        return new Promise((resolve, reject) => {
          login(username, userInfo.password).then(response => {
            const token = response.data.token;
            // 登录成功之后主要目的获取token;
            // token保存方式为：setToken,'SET_TOKEN';
            setToken(token)
            commit('SET_TOKEN', token)
            resolve()
          }).catch(error => {
            console.log(error);
            reject(error)
          })
        })
      },
  
      // 根据token获取用户信息
      GetInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
          getInfo(state.token).then(response => {
            const data = response.data // obj
            if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles) // []
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve(response.data)
          }).catch(error => {
            reject(error)
          })
        })
      },
  
      // 登出
      LogOut({ commit, state }) {
        return new Promise((resolve, reject) => {
          console.log('LogOut-----111----');
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          // commit('CLEAR_LOCK')
          removeToken()
          resolve()
          // logout(state.token).then(() => {
          //   commit('SET_TOKEN', '')
          //   commit('SET_ROLES', [])
          //   commit('CLEAR_LOCK')
          //   removeToken()
          //   resolve()
          // }).catch(error => {
          //   reject(error)
          // })
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

      // 动态修改权限;本实例中,role和token是相同的;
      ChangeRoles({ commit }, role) {
        return new Promise(resolve => {
          const token = role;
          commit('SET_TOKEN', token)
          setToken(token)
          getInfo(token).then(response => {
            const data = response.data
            // 根据token,获取到新的roles信息并保存到vuex;
            commit('SET_ROLES', data.roles)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve()
          })
        })
      },
      
      // 获取用户列表
      GetUserList({ commit }, reqData) {
        return new Promise(resolve => {
          getUserList(reqData).then(response => {
            const data = response.data
            resolve(data)
          })
        })
      } 


  }
}

export default user;

/**
 * 1、用户退出,需要调取后台接口吗？后台具体的业务逻辑是什么？
 * 
 * 
 */