
<template>
    <div class="menu_top rflex" ref="menuTop">
        <el-menu 
            mode="horizontal" 
            class="el-menu-demo rflex el-scrollbar2 top-scrollbar2" 
            :background-color="menuObj.bgColor"
            :text-color="menuObj.textColor"
            :active-text-color="menuObj.activeTextColor"
            :default-active="$route.path" 
            >
            <template v-for="(item,index) in topRouters">
                <router-link :to="$route.matched[1].path+'/'+item.path" :key="index">
                    <el-menu-item :index="$route.matched[1].path+'/'+item.path">
                        {{item.title}}
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
           this.setLeftInnerMenu();  // 针对刷新页面时，也需要加载顶部菜单
        },
        mounted(){
        },
        methods:{
            setLeftInnerMenu(){
                const titleList = this.$route.matched[1].meta.titleList;
                const currentTitle = titleList && this.$route.matched[2].meta.title;
                if( titleList && this.$route.matched[1].meta.routerType === 'leftmenu'){ // 点击的为 左侧的2级菜单
                    this.$store.dispatch('ClickLeftInnerMenu',{'titleList':titleList});
                    this.$store.dispatch('ClickTopMenu',{'title':currentTitle});
                }else{ // 点击左侧1级菜单
                    this.$store.dispatch('ClickLeftInnerMenu',{'titleList':[]});
                    this.$store.dispatch('ClickTopMenu',{'title':''});
                }

                // if(this.$route.meta.routerType === "topmenu"){ // 点击顶部菜单
                //     // 计算出点击菜单的index;
                //     let menuIndex = 0;
                //     titleList.forEach((item,index) => {
                //         (item.title === currentTitle)? menuIndex = index:0;
                //     })
                //     this.$store.dispatch('ClickTopMenu',{"menuIndex":menuIndex});
                // }
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
            // overflow-x: scroll;
            overflow-y:hidden;
            flex:1;
        }
        .el-menu-item:focus, .el-menu-item:hover {
            outline: 0;
            background-color: #ceeda8;
        }
        .router-link-active{
          
        }
    }
</style>