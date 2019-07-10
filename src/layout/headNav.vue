<template>
    <header class="head-nav rflex " id='header_container'>
        <div class='logo-container rflex'>
            <img class="logo" :src="logo" alt="小爱admin">
            <span class='title'>小爱<i>Admin</i></span>
        </div>
        <div class="right-nav" ref="rightNav">
            <top-menu></top-menu>
            <div class="userinfo-right rflex">
                <div class="notify-row">
                    <ul class="top-menu">
                        <li class="li-badge">
                            <el-tooltip class="item" effect="dark" content="访问github" placement="top">
                                <a :href='github' target="_blank">
                                    <el-badge class="item one">
                                        <i class="fa fa-github"></i>
                                    </el-badge>
                                </a>
                            </el-tooltip>
                        </li>
                        <li class="li-badge">
                            <a href='#' v-popover:qcode>
                                <el-badge :value="6" class="item one">
                                    <i class="fa fa-wechat"></i>
                                </el-badge>
                            </a>
                            <el-popover
                                ref="qcode"
                                popper-class="qcodepopper"
                                placement="bottom"
                                trigger="hover">
                                    <div class="wechat-area cflex">
                                        <p class="titles">加我微信</p>
                                        <img :src="wechat.wechatImg" alt="加我微信"  />
                                    </div>
                            </el-popover>
                        </li>
                        <li class="li-badge">
                            <a :href='indexRouter' v-popover:qqcode>
                                <el-badge :value="12" class="item two">
                                    <i class="fa fa-qq"></i>
                                </el-badge>
                            </a>
                             <el-popover
                                ref="qqcode"
                                popper-class="qcodepopper"
                                placement="bottom"
                                trigger="hover">
                                    <div class="wechat-area cflex">
                                        <p class="titles">加入qq群</p>
                                        <img :src="qq.qqImg" alt="加入qq群"  />
                                    </div>
                            </el-popover>
                        </li>
                    </ul>
                </div>
                <div class="userinfo">
                    <img src="../assets/img/avatar.png" class='avatar' alt="">
                    <div class='welcome'>
                        <p class='name comename'>欢迎</p>
                        <p class='name avatarname'>{{username}}</p>
                    </div>
                    <span class='username'>
                        <el-dropdown
                                trigger="click"
                                @command='setDialogInfo'>
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='info'>修改信息</el-dropdown-item>
                                <el-dropdown-item command='pass'>修改密码</el-dropdown-item>
                                <el-dropdown-item  command='logout'>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    <i class="fa fa-sign-out logout" @click='logout'></i>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { mapGetters } from "vuex";
    import * as mUtils from '@/utils/mUtils'
    import store from "@/store";
    import topMenu from "./topMenu";
    import wechatImg from "@/assets/img/wechat.jpg";
    import qqImg from "@/assets/img/qq.png";
    import logoImg from "@/assets/img/logo.png";
    import { github } from "@/utils/env";


    export default {
          name: 'head-nav',
          data(){
            return{
                username:'',
                indexRouter:'#/index/index',
                logo:logoImg,
                wechat:{
                    wechatImg:wechatImg,
                    isWechat:false
                },
                qq:{
                    qqImg:qqImg,
                    isQq:false,
                },
                github:github
            }
          },
          components:{
            topMenu
          },
          computed:{
          },
          created(){
              this.username = store.getters.name;
          },
          mounted(){
          },
          methods:{
              showWechat(){
                  this.wechat.isWechat = true;
              },
              hideWechat(){
                 this.wechat.isWechat = false;
              },
              showQq(){
                  this.qq.isQq = true;
              },
              hideQq(){
                  this.qq.isQq = false;
              },
              logout(){
                  this.$store.dispatch('LogOut').then(() => {
                      location.reload();
                  })
              },
              showInfoList(){
                  this.$router.push('/infoModify');
              },
             /**
             * 弹出框-修改密码或者系统设置   
             * @param {string} cmditem 弹框类型
             */
            setDialogInfo(cmditem) {
                if (!cmditem) {
                    this.$message('菜单选项缺少command属性');
                    return;
                }
                switch (cmditem) {
                    case 'info':
                    case 'pass':
                        this.showInfoList();
                        break;
                    case 'logout':
                        this.logout();
                        break;
                }
            },
          }
    }
</script>

<style scoped lang='less'>
    .logo-container {
         min-width: 180px;
         align-items: center;
         justify-content: space-around;
         text-transform: uppercase;
         box-sizing: border-box;
         box-shadow:0px 2px 5px 0px rgba(230,224,224,0.5);
        .logo {
            height: 36px;
            width: 36px;
            vertical-align: middle;
            display: inline-block;
        }
        .title{
            font-size: 22px;
            i{
                color:#FF6C60;
            }
        }
    }
    .right-nav{
        display: flex;
        flex: 1;
        width:calc(100% - 180px);
        padding-right: 15px;
        justify-content: space-between;
        box-shadow:0px 2px 5px 0px rgba(237,233,233,0.5);
    }
    .fa-user {
        position: relative;
        top: -2px;
        margin-right: 4px;
    }
    .head-nav {
        justify-content: space-between;
        width: 100%;
        height: 60px;
        min-width: 600px;
        position: fixed;
        top: 0px;
        left: 0px;
        box-sizing: border-box;
        // z-index: 5;
        .logout {
            vertical-align: middle;
            cursor: pointer;
        }
    }
    .middle{
       align-items: center;
       border:1px solid;
    }
    .userinfo-right{
        justify-content: flex-end;
        min-width: 330px;
        width:330px;
        margin-right: 20px;
    }
    .userinfo {
        line-height: 60px;
        text-align:right;
    }
    .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }
    .welcome{
        display: inline-block;
        width:auto;
        vertical-align: middle;
        padding: 0 5px;
        .name{
            line-height: 20px;
            text-align: center;
            font-size: 14px;
        }
        .comename{
            font-size: 12px;
        }
        .avatarname{
            color:#a9d86e;
            font-weight:bolder;
        }
    }

    .username {
        cursor: pointer;
        margin-right: 5px;
    }
    .border{
        border:1px solid;
    }
    .notify-row{
        line-height:60px;
        margin-right: 20px;
        margin-top: 5px;
    }
    ul.top-menu > li {
        float: left;
        margin-right: 20px;
        position: relative;
    }
    ul.top-menu > li > a {
        color:#3bc5ff;
        font-size: 16px;
        border-radius: 4px;
        -webkit-border-radius: 4px;
        border: 1px solid #f0f0f8 !important;
        padding: 2px 6px 4px 6px;
    }
</style>
