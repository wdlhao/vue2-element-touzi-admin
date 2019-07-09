import request from '@/utils/axios'

export function getSalesTableList(params) {
  return request({
    url: '/sales/get',
    method: 'get',
    params: params
  })
}