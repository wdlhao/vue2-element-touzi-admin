<template>
  <div class="search_container searchArea">
        <el-form 
            :inline="true" 
            :model='search_data' 
            ref="search_data" 
            class="demo-form-inline search-form">
            <el-form-item label="投资时间:">
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
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="search_data.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size ="mini" icon="search" @click='onScreeoutMoney("search_data")'>筛选</el-button>
            </el-form-item>

            <el-form-item class="btnRight">
                <el-button type="success" size ="mini" icon="view">导出Elcel</el-button>
                <el-button type="primary" size ="mini" icon="view" @click='onAddMoney()'>添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
      name:'searchItem',
      data(){
          return {
            search_data:{
                startTime:'',
                endTime:'',
                username:''
            },
           
          }
      },
      props:{

      },
      created(){

      },
      mounted(){

      },
      methods:{
          onScreeoutMoney(){

          },
          onAddMoney(){
              this.$emit("showDialog",'add');
          },
        //表单提交
        onSubmit(form){
            this.$refs[form].validate((valid) => {
                if (valid) {//表单数据验证完成之后，提交数据;
                    let formData = this[form];
                    let data = {};
                
                    for(var i in formData){
                        data.id = this.editid;
                        data.accoutCash = Number(formData['accoutCash'])
                        data.income = Number(formData['income'])
                        data.pay = Number(formData['pay'])
                        data.incomePayType = parseInt(formData['incomePayType'])
                        data.incomePayDes = formData['incomePayDes']
                        data.remarks = formData['remarks']
                    }
                    console.log(data);
                    if(this.editid != ""){
                        this.editMoneyIncomePay(data)
                    }else{
                        this.addMoneyIncomePay(data)
                    }
                    
                }
            })
        },
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
