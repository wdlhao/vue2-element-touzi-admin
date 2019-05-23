import request from '@/utils/axios'
import qs from "qs"

export function login(username, password) {
  return request({
    url: process.env.API_BASE_URL+'/user/login',
    method: 'post',
    data: {
      username,
      password
    },
    mockType:'remote'
  })
}

export function getInfo(token) {
  return request({
    url: process.env.API_BASE_URL+'/user/info',
    method: 'get',
    params: { token },
    mockType:'remote'
  })
}

export function logout() {
  return request({
    url: process.env.API_BASE_URL+'/user/logout',
    method: 'post',
    mockType:'remote'
  })
}
