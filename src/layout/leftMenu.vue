<template>
    <div class="menu_page el-scrollbar" ref="menu_page" :style="{'width':sidebar.width}">
        <el-menu 
            mode="vertical"
            theme="dark" 
            :show-timeout="200"
            :default-active="$route.path" 
            :collapse="isCollapse"
            :background-color="menuObj.bgColor"
            :text-color="menuObj.textColor"
            :active-text-color="menuObj.activeTextColor"
            :style="{'width':sidebar.width}">
                <template v-for="(item,index) in permission_routers">
                    <!--表示 有一级菜单-->
                    <router-link v-if="!item.hidden && item.noDropdown" :to="item.path+'/'+item.children[0].path" :key="index">
                        <el-menu-item class="dropItem" 
                            :index="item.path+'/'+item.children[0].path"
                            >
                            <i v-if="item.meta.icon" :class="'fa fa-margin '+item.meta.icon"></i>
                            <span v-if="item.meta.title" slot="title">{{item.meta.title}}</span> 
                        </el-menu-item>
                    </router-link>

                    <!--表示 有二级或者多级菜单 -->
                    <el-submenu v-if="item.children  && item.children.length >= 1 && !item.hidden && !item.noDropdown"  :index="item.path" :key="index">
                        <template slot="title">
                            <i v-if="item.meta.icon" :class="'fa fa-margin '+item.meta.icon"></i>
                            <span v-if="item.meta.title" slot="title">{{item.meta.title}}</span>
                        </template>
                        <!--直接定位到子路由上，子路由也可以实现导航功能-->
                        <router-link v-for="(citem,cindex) in item.children" :to="getIindex(citem,item,cindex)"  :key="cindex">
                            <el-menu-item 
                                v-if="citem.meta.routerType != 'topmenu' && citem.meta.title"
                                :index="getIindex(citem,item,cindex)">
                                <span slot="title">{{citem.meta.title}}</span>
                            </el-menu-item> 
                        </router-link>
                    </el-submenu>
                </template>
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as mUtils from "@/utils/mUtils";

export default {
  name: "left-Menu",
  data() {
    return {
       menuObj:{
         bgColor:'#324057',
         textColor:'#fff',
         activeTextColor:'#ff6428',
       }
    };
  },
  computed:{
      ...mapGetters([
        'permission_routers',
        'isCollapse',
        'sidebar',
        'menuIndex'
      ]),
  },
  created(){
    // console.log(this.menuIndex);
  },
  mounted(){
      this.setMenuHeight();
  },
  methods: {
    setMenuHeight(){
        this.$nextTick(() => {
          this.$refs.menu_page.style.height =  (document.body.clientHeight - 60)+'px';
      })
    },
    getIindex(citem,item,cindex){
      return (citem.meta.titleList)?item.path+'/'+citem.path+'/'+citem.meta.titleList[0].path:item.path+'/'+citem.path;
    }
  }
};
</script>


<style lang="less" scoped>
  @left-bgColor:rgb(50, 64, 87);  // 左侧菜单背景颜色;
  @icon-link:#FF6C60;

  .menu_page {
      position: fixed;
      top: 60px;
      left: 0;
      background-color: @left-bgColor;
      z-index: 99;
      overflow-y: scroll;
  }
  .fa-margin {
    margin-right: 5px;
  }
  .router-link-active {
    li {
        .el-submenu__title{
            color: @icon-link !important;
        }
    }
  }
</style>
