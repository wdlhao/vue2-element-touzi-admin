
<template>
    <div class="menu_top rflex" ref="menuTop">
        <el-menu 
            mode="horizontal" 
            class="el-menu-demo rflex el-scrollbar top-scrollbar" 
            :background-color="menuObj.bgColor"
            :text-color="menuObj.textColor"
            :active-text-color="menuObj.activeTextColor"
            :default-active="activeIndex" 
            >
            <template v-for="(item,index) in topRouters">
                <router-link :to="item.path" :key="index">
                    <el-menu-item :index="item.path">
                        {{item.meta.title}}
                    </el-menu-item>
                </router-link>
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
        computed:{
            ...mapGetters(['topRouters'])
        },
        created(){
           this.setLeftInnerMenu();
        },
        methods:{
            setLeftInnerMenu(){
                if(this.$route.meta.routerType == 'leftmenu'){ // 点击的为 左侧的2级菜单
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
        },
        watch:{
            "$route":"getPath" 
        }
    }

</script>

<style lang="less" scoped>
    .menu_top{
        width:calc(100% - 350px);
        .el-menu-demo{
            overflow-x: scroll;
            overflow-y:hidden;
            flex:1;
        }
    }
</style>