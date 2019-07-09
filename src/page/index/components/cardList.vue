
<template>
  <div class="cardContainer">
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '0px' }" class="cardBody">
          <img :src="userImg" class="userImg" alt="">
          <div class="progress wflex">
            <el-progress :percentage="0"></el-progress>
            <el-progress :percentage="70"></el-progress>
            <el-progress :percentage="100" status="success"></el-progress>
            <el-progress :percentage="50" status="exception"></el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import userImg from "@/assets/img/avatar-3.png";

export default {
  name:'cardList',
  data() {
    return {
        userImg:userImg

    };
  }
}
</script>

<style lang="less" scoped>
.cardContainer{
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  height:398px;
  overflow: hidden;
  .userImg{
    //  height: 200px;
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

