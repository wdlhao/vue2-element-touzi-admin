const types = {
    SET_WIN_CONTENT : 'SET_WIN_CONTENT', //设置content部分的宽高
}

const state = {
   win_content:{
	   width:'',
	   height:''
   }
}

const getters = {
     width: state => state.win_content.width,
     height: state => state.win_content.height
}

const mutations = {
    [types.SET_WIN_CONTENT] (state, contentobjs) {  
		state.win_content.width = contentobjs.width
		state.win_content.height = contentobjs.height
    },  
}

const actions = {
	set_win_content:({ commit },contentobjs) => {
        commit(types.SET_WIN_CONTENT, contentobjs)  
    },
}

export default  {
    state,
    getters,
    mutations,
    actions
}