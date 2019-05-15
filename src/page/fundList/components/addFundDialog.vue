<template>
    <el-dialog 
        :title="dialog.title" 
        :visible.sync="dialog.show"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false">
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

                <el-form-item prop='incomePayDes' label="收支描述:">
                    <el-input type="textarea" v-model="form.incomePayDes"></el-input>
                </el-form-item>

                <el-form-item prop='income'  label="收入:">
                    <el-input type="income" v-model.number="form.income"></el-input>
                </el-form-item>

                <el-form-item prop='pay' label="支出:">
                    <el-input type="pay" v-model.number="form.pay"></el-input>
                </el-form-item>

                <el-form-item prop='accoutCash' label="账户现金:">
                    <el-input type="accoutCash" v-model.number="form.accoutCash"></el-input>
                </el-form-item>

                    <el-form-item label="备注:">
                    <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>

                <el-form-item  class="text_right">
                    <el-button @click="dialog.show = false">取 消</el-button>
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
          return {
            form:{
                incomePayType:'',
                incomePayDes: '',
                income: '',
                pay:'',
                accoutCash:'',
                remarks: ''
            },
            form_rules: {
                    incomePayDes   : [
                    {required: true, message : '收支描述不能为空！',trigger : 'blur'}
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
                show : false,
                title: '修改资金信息',
                formLabelWidth:'120px'
            }
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
