<template>
  <div class="fillcontain">
    <div class="contain" ref="contain">
      <switch-roles @change="handleRolesChange" />
      <div :key="key" class="cflex">
        <span v-permission="['admin']" class="permission-alert">
          Only admin can see this
          <el-button type="warning">admin</el-button>
          <el-button type="danger">危险按钮</el-button>
        </span>

        <span  v-permission="['editor']"  class="permission-alert">
          Only editor can see this
          <el-button type="success">编辑</el-button>
          <el-button type="info">信息按钮</el-button>
        </span>

        <span v-permission="['admin','editor']" class="permission-alert">
          Both adminand editor can see this
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import SwitchRoles from './components/SwitchRoles'
import * as mutils from '@/utils/mUtils'

export default {
  name: 'directivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  mounted(){
    mutils.setContentHeight(this,this.$refs.contain,210);
  },
  methods: {
    handleRolesChange() {
      this.key++
    }
  }
}

/**
 * 添加按钮权限的业务逻辑：
 * 1、在需要添加权限的按钮上或按钮区域内,注册全局指令v-permission="['admin']",接收的值为数组形式;
 * 2、指令内部的计算逻辑(参考directive/permission/permisson.js)：
 *   通过inserted函数，当被绑定的元素插入到DOM中时，如果指令的value为数组形式并传入roles信息时，
 *   用户当前roles与指令roles，进行循环匹配，只要能匹配到就返回true;不能匹配，则隐藏该元素;
 * 3、全局注册指令：Vue.directive('permission', permission)
 * 4、Vue.use(install);
 * 
 */
</script>

<style lang="less" scoped>
.fillcontain {
  .contain{
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .cflex{
    .permission-alert{
       margin-bottom: 20px;
    }
  }
}
</style>

