import request from '@/utils/axios'
import { appUrl }  from '@/utils/env'


export function login(username, password) {
  return request({
    url: appUrl+'/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: appUrl+'/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: appUrl+'/user/logout',
    method: 'post'
  })
}
