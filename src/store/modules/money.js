
import { getMoneyIncomePay } from '@/api/money'  // 导入资金信息相关接口

const money = {
  state: {
     addFundDialog: {
        title:'新增资金信息',
        type:'add'
     },
     search: {
        startTime:'',
        endTime:'',
        name:''
     },
     searchBtnDisabled: true
  },
  getters:{
    addFundDialog: state => state.addFundDialog,
    search: state => state.search,
    searchBtnDisabled: state => state.searchBtnDisabled,
  },
  mutations: {
    SET_DIALOG_TITLE: (state, type) => {
      if(type === 'add'){
        state.addFundDialog.title = '新增资金信息'
        state.addFundDialog.type = 'add'
      }else{
        state.addFundDialog.title = '编辑资金信息'
        state.addFundDialog.type = 'edit'
      }
    },
    SET_SEARCH : (state, payload) => {
       state.search = payload;
    },
    SET_SEARCHBTN_DISABLED : (state, payload) => {
      state.searchBtnDisabled = payload;
   }
  },
  actions: {
     // 获取资金列表
     GetMoneyIncomePay({commit},reqData) {
        return new Promise(resolve => {
            getMoneyIncomePay(reqData).then(response => {
                const data = response.data
                resolve(data)
            })
        })
    } 


  }
}

export default money
