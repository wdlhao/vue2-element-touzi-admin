<template>
  <div class="search_container searchArea">
        <el-form 
            :inline="true" 
            :model='search_data' 
            ref="search_data" 
            class="demo-form-inline search-form">
            <!-- <el-form-item label="投资时间:">
                <el-date-picker
                    v-model="search_data.startTime"
                    type="datetime"
                    placeholder="选择开始时间">
                </el-date-picker> --
                <el-date-picker
                    v-model="search_data.endTime"
                    type="datetime"
                    placeholder="选择结束时间">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item label="">
                <el-input v-model="search_data.name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size ="mini" icon="search" @click='onScreeoutMoney("search_data")'>筛选</el-button>
            </el-form-item>

            <el-form-item class="btnRight">
                <el-button type="primary" size ="mini" icon="view" @click='onBatchDelMoney()' :disabled="searchBtnDisabled">批量删除</el-button>
                <el-button type="success" size ="mini" icon="view">导出Elcel</el-button>
                <el-button type="primary" size ="mini" icon="view" @click='onAddMoney()'>添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
   import { mapGetters } from 'vuex'

  export default {
      name:'searchItem',
      data(){
          return {
            search_data:{
                startTime:'',
                endTime:'',
                name:''
            },
           
          }
      },
       computed:{
        ...mapGetters(['searchBtnDisabled']),

      },
      methods:{
          onScreeoutMoney(){
              this.$store.commit('SET_SEARCH',this.search_data);
              this.$emit("searchList");
          },
          onAddMoney(){
              this.$emit("showDialog",'add');
          },
          onBatchDelMoney(){
              this.$emit("onBatchDelMoney");
          }
      }
  }
</script>

<style lang="less" scoped>
    .search_container{
        margin-bottom: 20px;
    }
    .btnRight{
        float: right;
        margin-right: 0px !important;
    }
    .searchArea{
        background:rgba(255,255,255,1);
        border-radius:2px;
        padding: 18px 18px 0;
    }
</style>
