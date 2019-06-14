import Vue from 'vue'
import Router from 'vue-router'
import Layout  from "../layout/home"; // 页面整体布局

Vue.use(Router)


export const topRouterMap = [
    {
        'parentName':'infoShow',
        'topmenulist':[
            {
                path: 'infoShow1',
                name: 'infoShow1',
                parentName: 'infoShow',
                meta: {
                    title: '个人信息子菜单1',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
            {
                path: 'infoShow2',
                name: 'infoShow2',
                parentName: 'infoShow',
                meta: {
                    title: '个人信息子菜单2',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
            {
                path: 'infoShow3',
                name: 'infoShow3',
                parentName: 'infoShow',
                meta: {
                    title: '个人信息子菜单3',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
            {
                path: 'infoShow4',
                name: 'infoShow4',
                parentName: 'infoShow',
                meta: {
                    title: '个人信息子菜单4',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
            {
                path: 'infoShow5',
                name: 'infoShow5',
                parentName: 'infoShow',
                meta: {
                    title: '个人信息子菜单5',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
            {
                path: 'infoShow6',
                name: 'infoShow6',
                parentName: 'infoShow',
                meta: {
                    title: '个人信息子菜单6',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
            {
                path: 'infoShow7',
                name: 'infoShow7',
                parentName: 'infoShow',
                meta: {
                    title: '个人信息子菜单7',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
            {
                path: 'infoShow8',
                name: 'infoShow8',
                parentName: 'infoShow',
                meta: {
                    title: '个人信息子菜单8',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
            {
                path: 'infoShow9',
                name: 'infoShow9',
                parentName: 'infoShow',
                meta: {
                    title: '个人信息子菜单9',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
            {
                path: 'infoShow10',
                name: 'infoShow10',
                parentName: 'infoShow',
                meta: {
                    title: '个人信息子菜单10',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/fundList/moneyData')
            },
        ]
    },
    {
        'parentName':'infoModify',
        'topmenulist':[
            {
				path:'infoModify1',
				name:'infoModify1',
				parentName:'infoModify',
				meta:{
					title:'修改信息子菜单1',
					icon:'fa-asterisk',
					routerType:'topmenu'
				},
				component: () => import('@/page/fundList/moneyData')
			},
			{
				path:'infoModify2',
				name:'infoModify2',
				parentName:'infoModify',
				meta:{
					title:'修改信息子菜单2',
					icon:'fa-asterisk',
					routerType:'topmenu'
				},
				component: () => import('@/page/fundList/moneyData')
			},
			{
				path:'infoModify3',
				name:'infoModify3',
				parentName:'infoModify',
				meta:{
					title:'修改信息子菜单3',
					icon:'fa-asterisk',
					routerType:'topmenu'
				},
				component: () => import('@/page/fundList/moneyData')
	        }
        ]
    },
]

Router.addRoutes(topRouterMap);

//注册路由
// export default new Router({
//     // mode: 'history', //后端支持可开
//     routes: topRouterMap
// })