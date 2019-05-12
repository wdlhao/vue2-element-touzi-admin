import Vue from 'vue'
import Router from 'vue-router'
import Layout  from "../layout/home"; // 页面整体布局

Vue.use(Router)

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
    path: '',  // ??
    component: Layout,
		redirect: '/index/index',
		hidden:true
  },
	{
	  path: '/login',
		name: 'login',
    hidden: true,
	  component: (resolve) => require(['@/page/login'], resolve)
	},
	{
		path: '/index',
		name: 'index',
		component:Layout,
		meta:{
			title:'首页',
		  icon: 'fa-dashboard',
		},
		children:[ // 
			{
				path:'/index', 
				hidden:true,
				meta:{
					title:'123', 
					icon:'fa-index',
				},
        component: () => import('@/page/index'), // 这里没有参数'resolve'
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
		path:'/userList',
		name: 'userList',
		meta: {
			title:'用户管理',
			icon: 'fa-user',
		}
	},
	{
		path:'/infoList',
		name:'infoList',
		meta: {
			title:'信息列表',
			icon: 'fa-envelope',
		}
	},
	{
	  path:'/infoManage',
	  name: 'infoManage',
	  meta: {
			title:'信息管理',
			icon: 'fa-asterisk',
	  },
	  component:Layout,
	  redirect: '/infoManage/infoShow',
	  children:[
		{
		   path:'/infoShow',
		   name:'infoShow',
		   meta: {
			    title:'个人信息',
					icon: 'fa-asterisk',
		   },
		   component:resolve => require(['@/page/infoShow'], resolve),
		},
		{
			path:'/infoModify',
			name:'infoModify',
			meta: {
				 title:'修改信息',
				 icon: 'fa-asterisk',
			},
			component:resolve => require(['@/page/infoModify'], resolve),
		 },
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
		redirect: '/fundManage/fundList',
		children:[
		  {
			 path:'/fundList',
			 name:'fundList',
			 meta: {
				  title:'资金流水',
				  icon: 'fa-asterisk',
			 },
			 component:resolve => require(['@/page/fundList'], resolve),
		  },
		  {
			  path:'/payList',
			  name:'payList',
			  meta: {
				   title:'支付单据',
				   icon: 'fa-asterisk',
			  },
			  component:resolve => require(['@/page/payList'], resolve),
		   },
		]
	},
	{
		path:'/touziManage',
		name: 'touziManage',
		meta: {
		  title:'投资管理',
		  icon: 'fa-inbox',
		},
		component:Layout,
		redirect: '/touziManage/chinaTouziList',
		children:[
		  {
			 path:'/chinaTouziList',
			 name:'chinaTouziList',
			 meta: {
				  title:'省份投资',
				  icon: '',
			 },
			 component:resolve => require(['@/page/chinaTouziList'], resolve),
		  },
		  {
			  path:'/chinaTabsList',
			  name:'chinaTabsList',
			  meta: {
				   title:'区域投资',
				   icon: '',
			  },
			  component:resolve => require(['@/page/chinaTabsList'], resolve),
		   },
		]
	},
	{
		path:'/fundArticle',
		name: 'fundArticle',
		meta: {
		  title:'金融文章',
			icon: 'fa-file-text-o',
		},
		component:Layout,
		redirect: '/fundArticle/createFundArticle',
		children:[
		  {
			 path:'/createFundArticle',
			 name:'createFundArticle',
			 meta: {
				  title:'发布文章',
				  icon: '',
			 },
			 component:resolve => require(['@/page/createFundArticle'], resolve),
		  },
		  {
			  path:'/modifyFundArticle',
			  name:'modifyFundArticle',
			  meta: {
				   title:'编辑文章',
				   icon: '',
			  },
			  component:resolve => require(['@/page/modifyFundArticle'], resolve),
		   },
		   {
				path:'/showFundArticle',
				name:'showFundArticle',
				meta: {
					title:'查看文章',
					icon: '',
				},
				component:resolve => require(['@/page/showFundArticle'], resolve),
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
			 path:'/fundPosition',
			 name:'fundPosition',
			 meta: {
				  title:'投资分布',
				  icon: '',
			 },
			 component:resolve => require(['@/page/fundPosition'], resolve),
		  },
		  {
			  path:'/typePosition',
			  name:'typePosition',
			  meta: {
				   title:'项目分布',
					 icon: '',
			  },
			  component:resolve => require(['@/page/typePosition'], resolve),
		   },
		   {
				path:'/incomePayPosition',
				name:'incomePayPosition',
				meta: {
					title:'收支统计',
					icon: '',
				},
				component:resolve => require(['@/page/incomePayPosition'], resolve),
		    }
		]
	},
	{
    path: '/permission',
		name: 'permission',
		meta: {
      title: '权限设置',
      icon: 'fa-lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    children: [{
			path: '/page',
			name: 'pagePermission',
      meta: {
        title: '页面权限',
        roles: ['admin'] // or you can only set roles in sub nav
      },
      component: () => import('@/page/permission/page'),
    }, {
			path: '/directive',
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
		// redirect: 'noredirect',
		hidden:true,
    name: 'errorPages',
    meta: {
      title: 'errorPages', 
      icon: '404'
    },
    children: [
      { path: '401', component: () => import('@/page/errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: () => import('@/page/errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },
	{ path: '*', redirect: '/404', hidden: true }
	];
	
	/**
	 *  路由设置要求：
	 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
	 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
	 * 
	 * 什么情况下，路由会定位到404页面?
	 * 
	 * 
	 */

