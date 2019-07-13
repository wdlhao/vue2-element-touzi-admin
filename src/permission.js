import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权(从cookie中获取)
import {
  setTitle
} from '@/utils/mUtils' // 设置浏览器头部标题

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
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
  // 点击登录时，拿到了token并存入了vuex;
  if (getToken()) {
    /* has token*/
    if(to.path === '/login') {
      next({ path: '/' })  // 会匹配到path:'',后面的path:'*'还没有生成;
      NProgress.done() 
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          const roles = res.roles
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问权限路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
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
      next()
    } else {
      // 点击退出时,会定位到这里
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
  
  用户点击登录之后的业务逻辑分析：
  1、用户调取登录接口，获取到token;进行路由跳转到首页;
  2、通过路由导航钩子router.beforeEach((to,from,next)=>{})函数确定下一步的跳转逻辑，如下：
   2.1、用户已经登录成功并返回token值；
     2.1.1、lock 锁屏场景;
     2.1.2、用户重新定位到登录页面;
      2.1.3、根据用户是否有roles信息，进行不同的业务逻辑，如下：
        (1)、初始情况下,用户roles信息为空;
            通过store.dispatch('GetInfo')调取接口,获取用户信息;
            获取到roles信息后,将roles,name,avatar保存到vuex;
            同时,通过store.dispatch('GenerateRoutes', { roles })去重新过滤和生成路由，并将重新生成之后的权限路由'routes'保存到vuex;
            最后,通过router.addRoutes()合并路由表;   
            如果在获取用户信息接口时，出现错误，则调取store.dispatch('FedLogOut')接口，返回到login页面;
            用户FedLogOut之后，需要情况vuex和localStorage中的token信息;
             
       (2)、用户已经拥有roles信息；
            点击页面路由，通过roles权限判断 hasPermission();
            如果用户有该路由权限，直接跳转对应的页面；如果没有权限，则跳转至401提示页面;
 
   2.2、用户没有获取到token值；
      2.2.1、如果设置了白名单用户，则直接跳转到相应的页面;反之，则跳转至登录页面;
      
 3、通过路由导航钩子函数router.afterEach(() => {}),做收尾工作，如下：
    3.1、NProgress.done() // 结束Progress
    3.2、获取到title并设置title;
 */