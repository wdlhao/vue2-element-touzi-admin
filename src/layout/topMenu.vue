
<template>
    <div class="menu_top" ref="menuTop">
        <el-menu 
            mode="horizontal" 
            class="el-menu-demo" 
            :active-text-color="menuObj.activeTextColor"
            :default-active="activeIndex" 
            @select="handleSelect">
            <template v-for="(item,index) in permission_routers">
                <router-link v-if="item.children  && item.children.length >= 1 && !item.hidden && !item.noDropdown" :to="item.path+'/'+item.children[0].path" :key="index">
                    <el-menu-item :index="item.path+'/'+item.children[0].path">
                    处理中心
                    </el-menu-item>
                </router-link>
                <!-- <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4">订单管理</el-menu-item> -->
            </template>
        </el-menu>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
  
    export default {
        name:'top-menu',
        data(){
            return {
                activeIndex:'1',
                menuObj:{
                    bgColor:'#324057',
                    textColor:'#fff',
                    activeTextColor:'#ff6428',
                }
            }
        },
        components:{

        },
        computed:{
            ...mapGetters([
                'permission_routers','isCollapse','sidebar'
            ])
        },
        created(){
            // console.log(this.permission_routers);
            let filterArr = this.filterPermissionRouters(this.permission_routers);
            console.log(filterArr);

        },
        mounted(){
           
        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            filterPermissionRouters(arr){
                arr.filter((item,index,self) => {
                    if(item.children.length >= 1){
                        this.filterPermissionRouters(item.children);
                    }
                    return item.children.meta.routerType === 'topMenu'
                })
            }
        }
    }

</script>

<style lang="less" scoped>

</style>