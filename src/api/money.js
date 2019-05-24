import request from '@/utils/axios'

export function getMoneyIncomePay(params) {
  return request({
    url: '/money/get',
    method: 'get',
    params: params
  })
}

export function addMoney(params) {
  return request({
    url: '/money/add',
    method: 'get',
    params: params
  })
}

export function removeMoney(params) {
  return request({
    url: '/money/remove',
    method: 'get',
    params: params
  })
}


export function batchremoveMoney(params) {
  return request({
    url: '/money/batchremove',
    method: 'get',
    params: params
  })
}

export function updateMoney(params) {
  return request({
    url: '/money/edit',
    method: 'get',
    params: params
  })
}

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }


