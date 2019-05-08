import Vue from 'vue'
import Router from 'vue-router'
import layout  from "../layout/home"; // 页面整体布局

Vue.use(Router)

/**
 * 1、roles:后台返回的权限结构;
 * 
 */
//手动跳转的页面白名单
const whiteList = [
	'/'
];
  
//默认不需要权限的页面
export const constantRouterMap = [
	//  {
  //   path: '/',
  //   component: layout,
  //   // redirect: '/login',
  //   name: 'login',
	// 	hidden: true,
	//   component: (resolve) => require(['@/page/login'], resolve)
  // },
	{
    path: '',  // ??
    component: layout,
		redirect: '/index',
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
		component:layout,
		meta:{
			title:'首页',
		  icon: 'fa-dashboard',
		},
		children:[
			{
				path:'/index', 
				meta:{
					title:'', 
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
			roles: ['admin', 'editor'],
		}
	},
	{
		path:'/infoList',
		name:'infoList',
		meta: {
			title:'信息列表',
			icon: 'fa-envelope',
			roles: ['editor']
		}
	},
	{
	  path:'/infoManage',
	  name: 'infoManage',
	  meta: {
			title:'信息管理',
			icon: 'fa-asterisk',
			roles: []
	  },
	  component:layout,
	  redirect: '/infoManage/infoShow',
	  children:[
		{
		   path:'/infoShow',
		   name:'infoShow',
		   meta: {
			    title:'个人信息',
					icon: 'fa-asterisk',
					roles: []
		   },
		   component:resolve => require(['@/page/infoShow'], resolve),
		},
		{
			path:'/infoModify',
			name:'infoModify',
			meta: {
				 title:'修改信息',
				 icon: 'fa-asterisk',
				 roles: []
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
		  roles: []
		},
		component:layout,
		redirect: '/fundManage/fundList',
		children:[
		  {
			 path:'/fundList',
			 name:'fundList',
			 meta: {
				  title:'资金流水',
				  icon: 'fa-asterisk',
				  roles: []
			 },
			 component:resolve => require(['@/page/fundList'], resolve),
		  },
		  {
			  path:'/payList',
			  name:'payList',
			  meta: {
				   title:'支付单据',
				   icon: 'fa-asterisk',
				   roles: []
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
		  roles: []
		},
		component:layout,
		redirect: '/touziManage/chinaTouziList',
		children:[
		  {
			 path:'/chinaTouziList',
			 name:'chinaTouziList',
			 meta: {
				  title:'省份投资',
				  icon: '',
				  roles: []
			 },
			 component:resolve => require(['@/page/chinaTouziList'], resolve),
		  },
		  {
			  path:'/chinaTabsList',
			  name:'chinaTabsList',
			  meta: {
				   title:'区域投资',
				   icon: '',
				   roles: []
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
			roles: ['admin', 'editor']
		},
		component:layout,
		redirect: '/fundArticle/createFundArticle',
		children:[
		  {
			 path:'/createFundArticle',
			 name:'createFundArticle',
			 meta: {
				  title:'发布文章',
				  icon: '',
			    roles: ['admin']
			 },
			 component:resolve => require(['@/page/createFundArticle'], resolve),
		  },
		  {
			  path:'/modifyFundArticle',
			  name:'modifyFundArticle',
			  meta: {
				   title:'编辑文章',
				   icon: '',
				   roles: []
			  },
			  component:resolve => require(['@/page/modifyFundArticle'], resolve),
		   },
		   {
				path:'/showFundArticle',
				name:'showFundArticle',
				meta: {
					title:'查看文章',
					icon: '',
					roles: []
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
		  roles: ['admin']
		},
		component:layout,
		redirect: '/fundData/fundPosition',
		children:[
		  {
			 path:'/fundPosition',
			 name:'fundPosition',
			 meta: {
				  title:'投资分布',
				  icon: '',
				  roles: ['admin','editor']
			 },
			 component:resolve => require(['@/page/fundPosition'], resolve),
		  },
		  {
			  path:'/typePosition',
			  name:'typePosition',
			  meta: {
				   title:'项目分布',
				   icon: '',
				   roles: ['editor']
			  },
			  component:resolve => require(['@/page/typePosition'], resolve),
		   },
		   {
				path:'/incomePayPosition',
				name:'incomePayPosition',
				meta: {
					title:'收支统计',
					icon: '',
					roles: ['editor']
				},
				component:resolve => require(['@/page/incomePayPosition'], resolve),
		    }
		]
	},
	{ path: '*', redirect: '/404', hidden: true }
  ];

