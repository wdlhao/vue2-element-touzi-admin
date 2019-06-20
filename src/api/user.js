import request from '@/utils/axios'
let target = process.env.VUE_APP_URL  // development和production环境是不同的


export function getUserList(reqData) {
  return request({
    url:target+'/user/getUserList',
    method: 'post',
    data: reqData
  })
}


