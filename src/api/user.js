import request from '@/utils/axios'
import { appUrl }  from '@/utils/env'


export function getUserList(reqData) {
  return request({
    url:appUrl+'/user/getUserList',
    method: 'post',
    data: reqData
  })
}


