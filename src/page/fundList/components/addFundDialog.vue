<template>
    <el-dialog 
        :visible.sync="isVisible"
        :title="dialog.title" 
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false"
        @close="closeDialog">
        <div class="form">
            <el-form 
                ref="form" 
                :model="form"
                :rules="form_rules"
                :label-width="dialog.formLabelWidth" 
                style="margin:10px;width:auto;">
                <el-form-item label="收支类型:" >
                    <el-select v-model="form.incomePayType" placeholder="收支类型">
                        <el-option label="提现" value="0"></el-option>
                        <el-option label="提现手续费" value="1"></el-option>
                        <el-option label="提现锁定" value="2"></el-option>
                        <el-option label="理财服务退出" value="3"></el-option>
                        <el-option label="购买宜定盈" value="4"></el-option>
                        <el-option label="充值" value="5"></el-option>
                        <el-option label="优惠券" value="6"></el-option>
                        <el-option label="充值礼券" value="7"></el-option>
                        <el-option label="转账" value="8"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop='username' label="用户名:">
                    <el-input type="text" v-model="form.username"></el-input>
                </el-form-item>

                <el-form-item prop='income'  label="收入:">
                    <el-input type="number" v-model.number="form.income"></el-input>
                </el-form-item>

                <el-form-item prop='pay' label="支出:">
                    <el-input type="number" v-model.number="form.pay"></el-input>
                </el-form-item>

                <el-form-item prop='accoutCash' label="账户现金:">
                    <el-input type="number" v-model.number="form.accoutCash"></el-input>
                </el-form-item>

                    <el-form-item label="备注:">
                    <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>

                <el-form-item  class="text_right">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>

<script>
  export default {
      name:'addFundDialog',
      data(){
          let validateData = (rule, value, callback) => {
                if(value === ''){
                    let text;
                    if(rule.field == "income"){
                        text='收入';
                    }else if(rule.field == "pay"){
                        text='支出';
                    }else{
                        text='账户现金';
                    }
                    callback(new Error(text+'不能为空~'));
                }else{
                   let numReg = /^[0-9]+.?[0-9]*$/;
                   if(!numReg.test(value)){
                      callback(new Error('请输入数字值'));
                   }else{
                      callback();
                   }
                }
            };
          return {
            isVisible:this.isShow,
            form:{
                incomePayType:'',
                username: '',
                income: '',
                pay:'',
                accoutCash:'',
                remarks: ''
            },
            form_rules: {
                username   : [
                    {required: true, message : '用户名不能为空！',trigger : 'blur'}
                ],
                income   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                pay   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                accoutCash   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
            },
            //详情弹框信息
            dialog: {
                width:'400px',
                title: '修改资金信息',
                formLabelWidth:'120px'
            }
          }
      },
      props:{
          isShow:Boolean
      },
      created(){
          console.log(this.isShow);
      },
      mounted(){

      },
      methods:{
          onScreeoutMoney(){

          },
          onAddMoney(){

          },
          closeDialog(){
              this.$emit('closeDialog');
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
                        data.username = formData['username']
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
