<template>
  <div class="fillcontain">
      <div class="contain" ref="contain">
        <div class="errPage-container cflex wflex">
            <img class="errorImg" :src="errorImg" />
            <p class="errorTitle">404</p>
            <p class="errorTro">抱歉，你访问的页面不存在。</p>
            <router-link :to="{path: '/'}">
              <el-button size="mini" type="primary">返回首页</el-button>
            </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import errorImg from "@/assets/img/404.png"
import * as mutils from '@/utils/mUtils'


export default {
    name: 'page401',
    data() {
      return {
        errorImg:errorImg
      }
    },
  	mounted(){
       mutils.setContentHeight(this,this.$refs.contain,250);
		},
    methods: {
    }
}
</script>

<style lang="less" scoped>
    .contain{
      display: flex;
      justify-content: center;
      padding: 20px;
       .errPage-container {
          align-items: center;
          p{
            line-height: 30px;
          }
          .errorImg{
            width:286px;
            height: 325px;
            margin-bottom: 10px;
          }
          .errorTitle{
            color: rgba(0,0,0,.85);
            font-size: 24px;
          }
          .errorTro{
            color: rgba(0,0,0,.45);
           font-size: 14px;
          }
      a{
        text-decoration: underline;
      }
      .rows{
        height: 100%;
        .el-col{
          text-align: center;
          height: 100%;
        }
        .title{
          font-size: 170px;
          line-height: 1.2;
          color: #a9d86e;
        }
        .neirongItem{
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          .tip{
            font-size: 30px;
            font-weight: bold;
            text-align: left;
          }
          .neirong{
            font-size: 20px;
            text-align: left;
          }
        }
      }
      .home{
        text-align: center;
      }
      .router-link-active:hover{
        color:#a9d86e;
        text-decoration: underline;
      }
    }
    }
   
</style>
