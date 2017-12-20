<template>
        <el-row class="menu_page">
            <el-col>
                 <el-menu 
                    mode="vertical"
                    theme="dark" 
                    class="el-menu-vertical-demo"
                    :default-active="$route.path" 
                    :collapse="$store.state.menu.isCollapse"
                    background-color="#324057"
                    text-color="#fff"
                    active-text-color="#42b983">
                       <template v-for="(item,index) in $store.state.menu.items" 
                          v-if='item.hidden !== true'>
                          <el-submenu v-if="item.children && !item.noDropdown && item.children.length > 0"  :index="item.path">
                            <template slot="title">
                                <i :class="'fa fa-margin '+item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <router-link v-for="(citem,cindex) in item.children" :to="citem.path"  :key="citem.path">
                                <el-menu-item 
                                    :index='citem.path'>
                                    <span slot="title">{{citem.name}}</span>
                                </el-menu-item> 
                            </router-link>
                        </el-submenu>

                         <router-link :to="item.path">
                            <el-submenu class="dropItem" v-if="item.children && item.noDropdown && item.children.length > 0"  :index="item.path">
                                <template slot="title" >
                                    <i :class="'fa fa-margin '+item.icon"  @mouseover="showDropdown"></i>
                                    <span :class="{'hiddenDropname':$store.state.menu.isDropname}"  slot="title">{{item.name}}</span> 
                                </template>

                                <router-link :to="item.path">
                                    <el-menu-item 
                                        :index='item.children[0].path'
                                        :class="{'hiddenDropdown':!$store.state.menu.isDropname}" >
                                        <span slot="title">{{item.children[0].name}}</span>
                                    </el-menu-item> 
                                </router-link>
                            </el-submenu>
                        </router-link>
                       </template>
                </el-menu>
            </el-col>
        </el-row>
</template>

<script>
	import * as mUtils from '@/utils/mUtils'

    export default {
		name:'left-Menu',
		data(){
			return {
                isDropdown:false,
			}
		},
        methods:{
           showDropdown(){ // ??
               //(this.$store.state.menu.isCollapse == true)?this.isDropdown = true: this.isDropdown = false
               // this.isDropdown = true,显示子菜单；false,隐藏子菜单。
               // isCollapse = false,展开菜单； true,收缩菜单。
               // this.$store.dispatch('dropName');
               // alert(this.$store.state.menu.isCollapse); // true
               this.isDropdown = this.$store.state.menu.isCollapse;
           },
         
        }
    }
</script>


<style lang="less" scoped>
	.menu_page{
		position: fixed;
		top:71px;
        left:0;
        min-height: 100%; 
        background-color: #324057;
        z-index: 99;
	}
    .fa-margin{
        margin-right:5px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
    }
    .el-menu-vertical-demo{
        width:35px;
    }
    .el-submenu .el-menu-item{
        min-width:180px;
    }
    .el-menu{
        .el-menu-item{
            padding-left:40px !important;
        }
     }
 
    .hiddenDropdown,
    .hiddenDropname{
        display:none;
    }

    
  
   
</style>
