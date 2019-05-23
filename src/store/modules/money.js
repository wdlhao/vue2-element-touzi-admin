
import { getMoneyIncomePay } from '@/api/money'  // 导入资金信息相关接口

const money = {
  state: {
     addFundDialog:{
        title:'新增资金信息',
        type:'add'
     }
  },
  getters:{
    addFundDialog: state => state.addFundDialog,
      
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
