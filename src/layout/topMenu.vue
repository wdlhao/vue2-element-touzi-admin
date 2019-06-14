
<template>
    <div class="menu_top rflex" ref="menuTop">
        <el-menu 
            mode="horizontal" 
            class="el-menu-demo rflex el-scrollbar top-scrollbar" 
            :background-color="menuObj.bgColor"
            :text-color="menuObj.textColor"
            :active-text-color="menuObj.activeTextColor"
            :default-active="activeIndex" 
            @select="handleSelect">
            <template v-for="(item,index) in topRouters">
                <router-link :to="item.path" :key="index">
                    <el-menu-item :index="item.path">
                        {{item.meta.title}}
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
                    bgColor:'',
                    textColor:'#303133',
                    activeTextColor:'#ff6428',
                },
            }
        },
        components:{

        },
        computed:{
            ...mapGetters(['topRouters'])
        },
        created(){
           this.setLeftInnerMenu();
        },
        mounted(){
           
        },
        methods:{
            setLeftInnerMenu(){
                if((this.$route.matched).length == 2 && this.$route.meta.routerType == 'leftmenu'){ // 点击的为 左侧的2级菜单
                    this.$store.dispatch('ClickLeftInnerMenu',
                        {'name':this.$route.name}
                    );
                }else{ // 点击顶部的菜单
                    this.$store.dispatch('ClickTopMenu',
                        {'title':this.$route.meta.title}
                    );
                }
            },
            getPath(){
                this.setLeftInnerMenu();
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            // 获取到当前3级子菜单
            filterPermissionRouters(arr){
                arr.forEach((item,index,self) => {
                    if(!item.noDropdown && item.children && item.children.length >= 1){
                        let childrens = arr[index].children;
                        childrens.forEach((item,index) => {
                            if(item.parentName === this.$route.name && !item.noDropdown && item.meta && item.meta.routerType ===  'topmenu'){
                                console.log(item.meta.title);
                                this.topRouters.push(item);
                            }
                        })
                        this.filterPermissionRouters(childrens);
                    }
                })
            }
        },
        watch:{
            "$route":"getPath" 
        }
    }

</script>

<style lang="less" scoped>
    .menu_top{
        width:1000px;
        .el-menu-demo{
            overflow-x: scroll;
            overflow-y:hidden;
            flex:1;
        }
    }
</style>