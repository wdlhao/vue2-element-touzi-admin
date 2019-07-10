
<template>
  <div class="cardContainer">
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '0px' }" class="cardBody">
          <a :href="github" target="_blank">
             <img :src="userImg" class="userImg" alt="">
          </a>
          <div class="progress wflex">
            <div class="rflex">
              <span class="title">vue:</span><el-progress :percentage="100" status="success"></el-progress>
            </div>
            <div class="rflex">
              <span class="title">js:</span><el-progress :percentage="80"></el-progress>
            </div>
            <div class="rflex">
              <span class="title">css:</span><el-progress :percentage="60"></el-progress>
            </div>
            <div class="rflex">
              <span class="title">html:</span><el-progress :percentage="90"></el-progress>
            </div>
            <div class="rflex">
              <span class="title">react:</span><el-progress :percentage="0"></el-progress>
            </div>
            <div class="rflex">
              <span class="title">angular:</span><el-progress :percentage="0"></el-progress>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import userImg from "@/assets/img/avatar-3.png";
  import { github } from "@/utils/env";

export default {
  name:'cardList',
  data() {
    return {
        userImg:userImg,
        github:github
    };
  }
}
</script>

<style lang="less" scoped>
.cardContainer{
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  height:407px;
  max-height: 407px;
  overflow: hidden;
  border-radius: 6px;
  .userImg{
    width: 100%;
    height: 236px;
  }
  .progress {
   padding: 10px;
    .rflex{
       justify-content: space-between;
       align-items: center;
       .title{
         width:65px;
       }
      .el-progress {
        flex: 1;
      }
    }
  }
}
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

