import { asyncRouterMap, constantRouterMap } from '@/router'
import { topRouterMap } from "@/router/topRouter";
import * as mutils from '@/utils/mUtils'



// 循环追加顶栏菜单
function addTopRouter(){
  asyncRouterMap.forEach( (item) => {
    if(item.children && item.children.length >= 1){
      item.children.forEach((sitem) => {
       topRouterMap.forEach((citem) => {
          if(sitem.name === citem.parentName){
              let newChildren = item.children.concat(citem.topmenulist); // arr
              item.children = newChildren;
          }
       })
      })
    }
  })
  return asyncRouterMap;
}

 // 获取到当前路由对应顶部子菜单
 function filterTopRouters(data){
    let topRouters = topRouterMap.find((item)=>{
       return item.parentName === data.name
    })
    if(!mutils.isEmpty(topRouters)){
       return topRouters.topmenulist;
    }
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // roles为权限身份数组
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  // 返回满足条件的子路由对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        // route.children重新过滤赋值;
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true // 返回该权限路由对象;
    }
    return false
  })
  return accessedRouters
}


const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    topRouters:[],
    topTitle:'',
    menuIndex:0
  },
  getters:{
    permission_routers: state => state.routers, // 所有路由
    addRouters: state => state.addRouters,  // 权限过滤路由
    topRouters: state => state.topRouters,  // 顶部三级路由
    topTitle:state => state.topTitle, // 顶部的title
    menuIndex:state => state.menuIndex, // 顶部菜单的index
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers // 权限路由
      state.routers = constantRouterMap.concat(routers) // 总路由
    },
    CLICK_INNER_LEFT_MENU:(state,data) => { // titleList:arr
        state.topRouters = data.titleList;
    },
    CLICK_TOP_MENU:(state,data) => {
      state.topTitle = data.title
      state.menuIndex = data.menuIndex

    },
  },
  actions: {
    // 根据角色，重新设置权限路由;并保存到vuex中,SET_ROUTERS;
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let roles = data.roles;
        let accessedRouters = '';
        if (roles.indexOf('admin') >= 0) {
          // 如果是管理员，直接将权限路由赋值给新路由;
          accessedRouters = asyncRouterMap
        } else {
          // 非管理员用户,如roles:['editor','developer']，则需要过滤权限路由数据
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    ClickLeftInnerMenu({ commit },data) {
      commit('CLICK_INNER_LEFT_MENU',data)
    },
    ClickTopMenu({ commit },data) {
      commit('CLICK_TOP_MENU',data)
    }
  }
}

export default permission
