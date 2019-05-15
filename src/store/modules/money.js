
import { getMoneyIncomePay } from '@/api/money'  // 导入资金信息相关接口

const permission = {
  state: {
   
  },
  getters:{
   
  },
  mutations: {
   
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

export default permission
