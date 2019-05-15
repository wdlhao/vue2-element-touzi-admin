import request from '@/utils/axios'

export function getMoneyIncomePay(reqData) {
  return request({
    url: '/money/getMoneyIncomePay',
    method: 'post',
    data: reqData
  })
}


