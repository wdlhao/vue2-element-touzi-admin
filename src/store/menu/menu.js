const types = {
    ADD_MENU : 'ADD_MENU', //添加菜单
    LOAD_ROUTES : 'LOAD_ROUTES',  //确定是否第一次加载route
    HANDLE_LEFT_MENU:'HANDLE_LEFT_MENU',  // 收缩左侧菜单
    INIT_LEFT_MENU:'INIT_LEFT_MENU',     // 初始化左侧菜单
    SET_LEFT_COLLAPSE:"SET_LEFT_COLLAPSE", // 改变左边菜单的收缩宽度
    DROP_NAME:'DROP_NAME',   // 收缩时，用于隐藏菜单名称
}


const state = {
    items: [],  
    isLoadRoutes: false,
    sidebar: {
        opened: true,  
        width: '180px'
    },
    isCollapse:false,  
    isDropname:false,
}

const getters = {
    menuitems:state => state.items, 
    isLoadRoutes:state => state.isLoadRoutes  
}

const mutations = {
    [types.ADD_MENU] (state, menuItems) {  
        if (menuItems.length === 0) {  
           state.items = []  
        } else {  
           state.items =  menuItems
        }  
    },  
    [types.LOAD_ROUTES] (state) {  
       state.isLoadRoutes = !state.isLoadRoutes  
    },
    [types.HANDLE_LEFT_MENU] (state) {  
        if(state.sidebar.opened){//true
            state.sidebar.width = '35px'
        }else{
            state.sidebar.width = '180px'
        }
       state.sidebar.opened = !state.sidebar.opened
    },
    [types.INIT_LEFT_MENU] (state) {  
       state.sidebar = {
           opened: true,  
           width: '180px'
       }
    },
    [types.SET_LEFT_COLLAPSE] (state) {  
        state.isCollapse = !state.isCollapse 
    },
     [types.DROP_NAME] (state) {  
       state.isDropname = !state.isDropname  
    },   
   


}

const actions = {
    addMenu:({ commit },menuItems) => {
        if (menuItems.length > 0) {  
            commit(types.ADD_MENU, menuItems)  
        }  
    },
    loadRoutes:({ commit }) => {  
       commit(types.LOAD_ROUTES)  
    },
    handleLeftMenu:({ commit }) => {  
       commit(types.HANDLE_LEFT_MENU)  
    },
    initLeftMenu:({ commit }) => {  
       commit(types.INIT_LEFT_MENU)  
    },
    setLeftCollapse:({ commit}) => {  
       commit(types.SET_LEFT_COLLAPSE)  
    },
    dropName:({ commit}) => {  
       commit(types.DROP_NAME)  
    },
  

}

export default  {
    state,
    getters,
    mutations,
    actions
}