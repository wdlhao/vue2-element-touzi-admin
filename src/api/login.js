import request from '@/utils/axios'

export function login(username, password) {
  return request({
    url: process.env.API_BASE_URL+'/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: process.env.API_BASE_URL+'/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: process.env.API_BASE_URL+'/user/logout',
    method: 'post'
  })
}
