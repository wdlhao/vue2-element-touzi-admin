<template>
  <div class="fillcontain">
    <div  class="contain">
       <switch-roles @change="handleRolesChange" />
    </div>
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'pagePermission',
  components: { SwitchRoles },
  methods: {
    handleRolesChange() {
      // 没有这个可以匹配的路由"/permission/index"，则会定位到404页面
      this.$router.push({ path: '/permission/index?time=' + +new Date() })
    }
  }
}
</script>

<style lang="less" scoped>
 .contain{
    background: #fff;
    padding: 20px;
    padding-bottom: 1px;
  }
</style>
