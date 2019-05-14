import request from '@/utils/axios'
// import qs from "qs"

export function getUserList(reqData) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    data: reqData
  })
}


