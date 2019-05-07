import request from '@/utils/axios'
import qs from "qs"

export function login(username, password) {
  console.log(username,password);
  return request({
    url: '/user/login',
    method: 'post',
    data: qs.stringify({
      username,
      password
    })
  })
}

export function getInfo(token) {
  return request({
    // url: '/user/info',
    url: '/api/datas/userInfo.json',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
