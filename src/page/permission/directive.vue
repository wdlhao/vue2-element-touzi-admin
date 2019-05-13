<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <span v-permission="['admin']" class="permission-alert">
        Only admin can see this
        <el-button type="warning">admin</el-button>
        <el-button type="danger">危险按钮</el-button>
      </span>

      <span v-permission="['editor']" class="permission-alert">
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
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'directivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  /deep/ .permission-alert {
    width: 100%;
    margin-top: 30px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: block;
  }
  /deep/ .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>

