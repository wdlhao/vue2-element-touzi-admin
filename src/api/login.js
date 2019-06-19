import request from '@/utils/axios'
let target = process.env.VUE_APP_URL  // development和production环境是不同的


export function login(username, password) {
  return request({
    url: target+'/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: target+'/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: target+'/user/logout',
    method: 'post'
  })
}
