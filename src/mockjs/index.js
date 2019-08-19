// import Vue from 'vue'
import Mock from 'mockjs'
// process.env.NODE_ENV === "development" ? Vue.use(Mock) : null;

import tableAPI from './money'
import salesAPI from './sales'
import userAPI from './user'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
})

// 资金相关
Mock.mock(/\/money\/get/, 'get', tableAPI.getMoneyList)
Mock.mock(/\/money\/remove/, 'get', tableAPI.deleteMoney)
Mock.mock(/\/money\/batchremove/, 'get', tableAPI.batchremoveMoney)
Mock.mock(/\/money\/add/, 'get', tableAPI.createMoney)
Mock.mock(/\/money\/edit/, 'get', tableAPI.updateMoney)
// sales相关
Mock.mock(/\/sales\/get/, 'get', salesAPI.getSalesList)
// user相关
Mock.mock(/\/user\/login/, 'get', userAPI.login)
Mock.mock(/\/user\/logout/, 'get', userAPI.logout)
Mock.mock(/\/user\/info\/get/, 'get', userAPI.getUserInfo)
Mock.mock(/\/user\/list\/get/, 'get', userAPI.getUserList)

export default Mock;