import request from '@/utils/axios'

export function login(username, password) {
  return request({
    url: '/api/user/login',
    method: 'get',
    data: {
      username,
      password
    }
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
