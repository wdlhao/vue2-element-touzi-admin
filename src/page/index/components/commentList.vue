<template>
    <div class="commentContainer cflex">
        <div class="comment rflex" v-for="(item,index) in commentData" :key="index">
            <div class="left">
               <img class="userImg" :src="userImg" alt="img" />
            </div>
            <div class="right cflex wflex">
               <p class="username">{{item.username}}</p>
               <p class="content">{{item.commentContent.substring(0,100)}}</p>
               <p class="dateTime"><icon-svg icon-class="icontime" />{{item.date}}</p>
            </div>
        </div>
    </div>
</template>

<script>
  import { getSalesTableList } from "@/api/sales";
  import userImg from "@/assets/img/avatar-3.png";

  export default {
    name:'commentList',
    data() {
      return {
        commentData: [],
        userImg:userImg
      }
    },
    mounted(){
        this.getSalesList();
    },
    methods:{
        // 获取列表数据
        getSalesList(){
            getSalesTableList({}).then(res => {
                let list = res.data.list
                this.commentData = list.slice(0,3);
            })
        },
    }
  }
</script>

<style lang="less" scoped>
 .commentContainer{
   background: #fff;
   padding: 10px;
   box-sizing: border-box;
   height: 407px;
   max-height: 407px;
   overflow: hidden;
   border-radius: 6px;
   justify-content: space-between;
   .comment{
       border-bottom: 1px solid #e8e8e8;
       padding-bottom: 5px;
      .left{
         width:80px;
         text-align: center;
         .userImg{
           width:50px;
           border-radius: 50%;
         }
      }
      .right{
           justify-content: space-between;
           height: 120px;
          .username{
            font-size: 14px;
            font-weight: bold;
          }
          .content{
            font-size: 13px;
            line-height: 20px;
          }
          .dateTime{
             text-align: right;
             font-size: 13px;
             color:#87DE75;
             .svg-icon{
               margin-right: 5px;
             }
          }

      }
   }
 }
</style>