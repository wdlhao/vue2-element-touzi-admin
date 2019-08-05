import request from '@/utils/axios'


export function login(params) {
  return request({
    url: '/user/login',
    method: 'get',
    data:params
  })
}
export function logout(params) {
  return request({
    url: '/user/logout',
    method: 'get',
    data:params
  })
}


export function getUserInfo(params) {
  return request({
    url: '/user/info/get',
    method: 'get',
    data:params
  })
}

export function getUserList(reqData) {
  return request({
    url:'/user/list/get',
    method: 'get',
    data: reqData
  })
}


