import Mock from 'mockjs'

import * as mUtils from '@/utils/mUtils'


let List = []
const count = 7


for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    userImg:Mock.Random.image(),
    username: Mock.Random.name(),
    date: Mock.Random.datetime(),
    price: Mock.Random.float(0, 9999, 2,2),
    status:Mock.Random.natural( 1,4 ),
    commentContent:Mock.Random.paragraph()
  }))
}

export default {
  /**
   * 获取sales列表数据
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getSalesList: config => {
    const { name, page = 1, limit = 7 } = mUtils.param2Obj(config.url)
    const mockList = List.filter(user => {
      if (name && user.username.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        list: pageList
      }
    }
  }
}