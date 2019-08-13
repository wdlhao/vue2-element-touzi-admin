<template>
  <div class="fillcontain" >
    <div  class="contain" ref="contain">
       <switch-roles @change="handleRolesChange" />
    </div>
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'
import * as mutils from '@/utils/mUtils'

export default {
  name: 'pagePermission',
  components: { SwitchRoles },
  mounted(){
    mutils.setContentHeight(this,this.$refs.contain,210);
  },
  methods: {
    handleRolesChange() {
      // 没有这个可以匹配的路由"/permission/index"，则会定位到404页面
      this.$router.push({ path: '/permission/index?time=' + +new Date() })
    },   
  }
}
</script>

<style lang="less" scoped>
 .contain{
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
