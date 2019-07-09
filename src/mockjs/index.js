import Mock from 'mockjs'

import tableAPI from './money'
import salesAPI from './sales'

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
