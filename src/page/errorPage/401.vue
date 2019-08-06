<template>
  <div ref="errPage" class="errPage">
    <div class="errPage-container">
      <el-row class="rows">
        <el-col :span="12">
          <h1 class="title">401</h1>
        </el-col>
        <el-col :span="12">
          <div class="neirongItem">
              <p class="tip">SORRY!</p>
              <p class="neirong">The page requires authentication.</p>
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
    name: 'page401',
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
            this.$refs.errPage.style.height =  (document.body.clientHeight)+'px';
        })
      }
    }
}
</script>

<style lang="less" scoped>
html{
  background:#F6F7FC;
}
.errPage{
    background: #F6F7FC;
    display: flex;
    justify-content: center;
    padding-top: 200px;
    .errPage-container {
      width: 800px;
      min-width: 800px;
      height: 205px;
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
