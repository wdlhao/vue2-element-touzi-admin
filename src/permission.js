import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
process.env.NODE_ENV === "development" && import('nprogress/nprogress.css')
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权(从cookie中获取)
import { getUserInfo } from "@/api/user";
import {
  setTitle
} from '@/utils/mUtils' // 设置浏览器头部标题

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true 
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
   // 设置浏览器头部标题
   const browserHeaderTitle = to.meta.title
   store.commit('SET_BROWSERHEADERTITLE', {
     browserHeaderTitle: browserHeaderTitle
   })
  // 点击登录时，拿到了token并存入了cookie,保证页面刷新时,始终可以拿到token
  if (getToken('Token')) {
    if(to.path === '/login') {
      next({ path: '/' })  
      NProgress.done() 
    } else {
      // 用户登录成功之后，每次点击路由都进行了角色的判断;
      if (store.getters.roles.length === 0) {
        let token = getToken('Token');
        getUserInfo({"token":token}).then().then(res => { // 根据token拉取用户信息
          let userList = res.data.userList;
          store.commit("SET_ROLES",userList.roles);
          store.commit("SET_NAME",userList.name);
          store.commit("SET_AVATAR",userList.avatar);
          store.dispatch('GenerateRoutes', { "roles":userList.roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问权限路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        }).catch((err) => {
          store.dispatch('LogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 点击退出时,会定位到这里
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
  setTimeout(() => {
    const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle(browserHeaderTitle)
  }, 0)
})



/**
  本系统权限逻辑分析：
  1、路由对象区分权限路由对象和非权限路由对象；初始化时，将非权限路由对象赋值给Router;同时设置权限路由中的meta对象，如:meta:{roles:['admin','editor']}
     表示该roles所拥有的路由权限;
  2、通过用户登录成功之后返回的roles值，进行路由的匹配并生成新的路由对象;
  3、用户成功登录并跳转到首页时，根据刚刚生成的路由对象，渲染左侧的菜单;即，不同的用户看到的菜单是不一样的;
  
  用户点击登录和退出之后的业务逻辑分析：
  1、用户点击登录按钮，通过路由导航钩子router.beforeEach()函数确定下一步的跳转逻辑,如下：
   1.1、用户已经登录成功过，并从cookie中拿到了token值;
     1.1.1、用户访问登录页面,直接定位到登录页面;
     1.1.1、用户访问非登录页面,需要根据用户是否有roles信息，进行不同的业务逻辑,如下：
        (1)、初始情况下,用户roles信息为空;
            1.通过getUserInfo()函数,根据token拉取用户信息;并通过store将该用户roles,name,avatar信息存储于vuex;
            2.通过store.dispatch('GenerateRoutes', { roles })去重新过滤和生成路由,通过router.addRoutes()合并路由表;   
            3.如果在获取用户信息接口时出现错误，则调取store.dispatch('LogOut')接口,返回到login页面;
          
        (2)、用户已经拥有roles信息；
            1.点击页面路由，通过roles权限判断 hasPermission()。如果用户有该路由权限，直接跳转对应的页面;如果没有权限，则跳转至401提示页面;
  
  2.用户点击退出,token已被清空
    1.如果设置了白名单用户，则直接跳转到相应的页面;
    2.反之,则跳转至登录页面;
 */