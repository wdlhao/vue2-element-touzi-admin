<template>
  <div ref="errPage" class="errPage">
    <div class="errPage-container">
      <el-row class="rows">
        <el-col :span="12">
          <h1 class="title">404</h1>
        </el-col>
        <el-col :span="12">
          <div class="neirongItem">
              <p class="tip">SORRY!</p>
              <p class="neirong">The page you’re looking for was not found.</p>
          </div>
        </el-col>
      </el-row>
      <router-link :to="{path: '/'}">
          <p class="home">Back to home</p>
      </router-link>
    </div>
  </div>
</template>
<script>

export default {
    name: 'page404',
    data() {
      return {
     
      }
    },
  	mounted(){
			this.setSectionHeight();
		},
    methods: {
      setSectionHeight(){
        this.$nextTick(() => {
            this.$refs.errPage.style.height =  (document.body.clientHeight - 120)+'px';
        })
      }
    }
}
</script>

<style lang="less" scoped>
.errPage{
    background: #F6F7FC;
    display: flex;
    justify-content: center;
    margin-top: 130px;
    .errPage-container {
      width: 800px;
      min-width: 800px;
      height: 205px;
      .rows{
        height: 100%;
        .el-col{
          text-align: center;
          height: 100%;
        }
        .title{
          font-size: 170px;
          line-height: 1.2;
          color: #F56C6C;
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
        margin: 10px auto;
        text-align: center;
      }
      .router-link-active:hover{
        color:#a9d86e;
        text-decoration: underline;
      }
  }
}
</style>
