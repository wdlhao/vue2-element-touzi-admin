
import store from '@/store'

export default{
  // inserted函数：当被绑定的元素插入到 DOM 中时……
  inserted(el, binding, vnode) {
    const { value } = binding  // 获取指令绑定的值;
    const roles = store.getters && store.getters.roles //用户本身的roles信息,arr;

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => { // 只要有一个满足即返回true
        return permissionRoles.includes(role)
      })
      // 没有该指令,直接删除掉该指令元素;即页面不显示没有指令权限的按钮;
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
        // 因项目需要，本指令remove其父元素;一般情况下，只隐藏其本身;
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}

