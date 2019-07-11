import Vue from 'vue'
import Router from 'vue-router'
import { Layout,Content }  from "../layout"; // 页面整体布局
import { topRouterMap } from "./topRouter";

console.log(topRouterMap);

Vue.use(Router)

function filterTopRouterMap(name){
	let router = topRouterMap.find((item,index) => {
		return item.parentName === name;
	});
	return router.data; // arr
}
console.log(filterTopRouterMap('infoShow'))

/**
 * 1、roles:后台返回的权限结构;
 * 
 */
//手动跳转的页面白名单
const whiteList = [
	'/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 * 
 */
//默认不需要权限的页面
export const constantRouterMap = [
	{
    path: '',  
    component: Layout,
		redirect: '/index/index',
		hidden:true
  },
	{ path: '/login',name: 'login',component:() => import('@/page/login'),hidden: true},
	{ path: '/404', component: () => import('@/page/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/page/errorPage/401'), hidden: true },
	{
		path: '/index',
		name: 'index',
		component:Layout,
		meta:{
			title:'首页',
		  icon: 'fa-dashboard',
		},
		noDropdown:true,
		children:[ 
			{
				path:'index', 
				meta:{
					title:'首页', 
					icon:'fa-index',
				    routerType:'leftmenu'
				},
                component: () => import('@/page/index/index'),
			}
		]
	}
]

	//注册路由
export default new Router({
	// mode: 'history', //后端支持可开
	routes: constantRouterMap
})

  //异步路由（需要权限的页面）
export const asyncRouterMap = [
	{
		path:'/userManager',
		name: 'userList',
		component:Layout,
		meta: {
			title:'用户管理',
			icon: 'fa-user',
		},
		noDropdown:true,
		children:[
			{
				path:'userList', 
				meta:{
					title:'用户管理', 
					icon:'fa-user',
				    routerType:'leftmenu'
				},
				component: () => import('@/page/userList/userList'),
			}
		]
	},
	{
		path:'/share',
		name: 'share',
		component:Layout,
		meta: {
			title:'分享功能',
			icon: 'fa-share',
		},
		noDropdown:true,
		children:[
			{
				path:'share', 
				meta:{
				  title:'分享功能', 
				  icon:'fa-share',
				  routerType:'leftmenu'
				},
				component: () => import('@/page/share'),
			}
		]
	},
	{
	  path:'/infoManage',
	  name: 'infoManage',
	  meta: {
			title:'信息管理',
			icon: 'fa-asterisk',
	  },
	  component:Layout,
	  children:[
		{
		   path:'infoShow',
		   name:'infoShow',
		   meta: {
			    title:'个人信息',
				icon: 'fa-asterisk',
				routerType:'leftmenu',
				titleList:[
					{"path":"infoShow1","title":"个人信息子菜单1"},
					{"path":"infoShow2","title":"个人信息子菜单2"},
					{"path":"infoShow3","title":"个人信息子菜单3"},
					{"path":"infoShow4","title":"个人信息子菜单4"},
					{"path":"infoShow5","title":"个人信息子菜单5"},
					{"path":"infoShow6","title":"个人信息子菜单6"}
				]
			 },
	  		 component:Content,
			 // redirect:'/infoManage/infoShow/infoShow1',
			 children:filterTopRouterMap('infoShow')
		},
		{
			path:'infoModify',
			name:'infoModify',
			meta: {
				title:'修改信息',
				icon: 'fa-asterisk',
				routerType:'leftmenu',
				titleList:[
					{"path":"infoModify1","title":"修改信息子菜单1"},
					{"path":"infoModify2","title":"修改信息子菜单2"},
					{"path":"infoModify3","title":"修改信息子菜单3"}
				]
			},
			//component: () => import('@/page/infoManage/infoModify'),
			component:Content,
			children:filterTopRouterMap('infoModify')
		 }
	  ]
	},
	{
		path:'/fundManage',
		name: 'fundManage',
		meta: {
		  title:'资金管理',
		  icon: 'fa-money',
		},
		component:Layout,
		children:[
		  {
			path:'fundList',
			name:'fundList',
			meta: {
					title:'资金流水',
					icon: 'fa-asterisk',
					routerType:'leftmenu'
			},
			component: () => import('@/page/fundList/fundList'),
		  },
		  {
			path:'chinaTabsList',
			name:'chinaTabsList',
			meta: {
				title:'区域投资',
					icon: 'fa-asterisk',
					routerType:'leftmenu'
			},
			component: () => import('@/page/fundList/chinaTabsList'),
			}
		]
	},
	{
		path:'/fundData',
		name: 'fundData',
		meta: {
		  title:'资金数据',
		  icon: 'fa-bar-chart-o',
		},
		component:Layout,
		redirect: '/fundData/fundPosition',
		children:[
		  {
			 path:'fundPosition',
			 name:'fundPosition',
			 meta: {
				  title:'投资分布',
				  icon: '',
			 },
			 component: () => import('@/page/fundData/fundPosition')
		  },
		  {
			  path:'typePosition',
			  name:'typePosition',
			  meta: {
				   title:'项目分布',
					 icon: '',
				},
				component: () => import('@/page/fundData/typePosition')
		   },
		   {
				path:'incomePayPosition',
				name:'incomePayPosition',
				meta: {
					title:'收支统计',
					icon: '',
				},
				component: () => import('@/page/fundData/incomePayPosition')
		    }
		]
	},
	{
    path: '/permission',
		name: 'permission',
		meta: {
      title: '权限设置',
      icon: 'fa-cogs',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    children: [{
			path: 'page',
			name: 'pagePermission',
      meta: {
        title: '页面权限',
        roles: ['admin'] // or you can only set roles in sub nav
      },
      component: () => import('@/page/permission/page'),
    }, {
			path: 'directive',
			name: 'directivePermission',
      meta: {
				title: '按钮权限',
				roles:['editor']
      },
      component: () => import('@/page/permission/directive'),
    }]
  },
  {
    path: '/error',
    component: Layout,
    name: 'errorPages',
    meta: {
      title: '错误页面', 
      icon: 'fa-exclamation-triangle'
    },
    children: [
			{  
				path: '401', 
				name: 'page401', 
				component: () => import('@/page/errorPage/401'), 
				meta: { 
					title: '401', 
					noCache: true 
			  }
			},
			{
				path: '404', 
				name: 'page404', 
				component: () => import('@/page/errorPage/404'), 
				meta: { 
					title: '404', 
					noCache: true
				}
			}
    ]
  },
	{ path: '*', redirect: '/404', hidden: true }
	];
	
	/**
	 *  路由设置要求：
	 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
	 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
	 * 
	 * 按需加载路由组件的2种方法：
	 * 1、component: () => import('@/page/login')
	 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
	 * 
	 * 
	 * 
	 * 什么情况下，路由会定位到404页面?
	 * 路由中redirect:'',不起作用？
	 * 三级子菜单要在顶部展示？
	 * 
	 * 
	 * 
	 */

