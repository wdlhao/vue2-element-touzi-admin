import { asyncRouterMap, constantRouterMap } from '@/router'

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


 // 获取到当前路由 3级子菜单
 function filterTopRouters(arr,data){
  let topRouters = [];
  arr.forEach((item,index) => {
      if(!item.noDropdown && item.children && item.children.length >= 1){
          let childrens = item.children;
          childrens.forEach((item) => {
            if(!item.noDropdown && item.children && item.children.length >= 1){ // 2级
                let childrens = item.children;
                // console.log(childrens)
                childrens.forEach((item) => { // 3级
                  if(data.name === item.parentName && !item.noDropdown && item.meta && item.meta.routerType ===  'topmenu'){
                    topRouters.push(item);
                  }
                })
            }            
          })
      }
  })
  console.log(topRouters);
  return topRouters;
}


const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    topRouters:[],
    isClickLeftInnerMenu:false
  },
  getters:{
    permission_routers: state => state.routers, // 所有路由
    addRouters: state => state.addRouters,  // 权限过滤路由
    topRouters: state => state.topRouters,  // 顶部三级路由
    isClickLeftInnerMenu:state => state.isClickLeftInnerMenu,
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers // 权限路由
      state.routers = constantRouterMap.concat(routers) // 总路由
    },
    CLICK_INNER_LEFT_MENU:(state,data) => {
        state.topRouters = filterTopRouters(state.routers,data);
        console.log(state.topRouters);
        // state.isClickLeftInnerMenu = true;
    }
  },
  actions: {
    // 根据角色，重新设置权限路由;并保存到vuex中,SET_ROUTERS;
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          console.log('admin>=0')
          // 如果是管理员，直接将权限路由赋值给新路由;
          accessedRouters = asyncRouterMap
        } else {
          console.log('admin<0')
          // 非管理员用户,如roles:['editor','developer']，则需要过滤权限路由数据
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    ClickLeftInnerMenu({ commit },data) {
      commit('CLICK_INNER_LEFT_MENU',data)
       // console.log(this.permission_routers);
        // accessedRouters = filterTopRouters(asyncRouterMap)
    }
  }
}

export default permission
