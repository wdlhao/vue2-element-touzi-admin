
import * as mUtils from '@/utils/mUtils'
import { logout ,getUserInfo } from '@/api/user'  // 导入用户信息相关接口
import { getToken, setToken, removeToken } from '@/utils/auth'


const user  = {
  state : {
    name:'',
    avatar:'',
    token: getToken('Token'),
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
    }
  },
  actions:{
      //登出
      LogOut({ commit, reqData }) {
        return new Promise((resolve, reject) => {
          logout(reqData).then(response => {
            commit('SET_ROLES', [])
            removeToken('Token')
            resolve()
          })
        })
      },
      // 动态修改权限;本实例中,role和token是相同的;
      ChangeRoles({ commit }, role) {
        return new Promise(resolve => {
          const token = role;
          setToken("Token",token)
          getUserInfo({"token":token}).then(res => {
            let data = res.data.userList;
            commit('SET_ROLES', data.roles)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve()
          })
        })
      },
      
  }
}

export default user;

/**
 * 1、用户退出,需要调取后台接口吗？后台具体的业务逻辑是什么？
 * 
 * 
 */