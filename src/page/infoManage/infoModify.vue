<template>
    <div class="fillcontain" ref="fillcontain">
        <div class="info_container" ref="info_container">
            <el-row class="info_row row" :gutter="10">
            <el-col :span="8">
            <div class="area">
                <p class="title">修改信息</p>
                <el-form class="form"  :model="infoForm" :rules="infoRules" ref="infoForm" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="infoForm.username"  size="mini" disabled placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="infoForm.nickname" size="mini" placeholder="请输入昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="投资年限" prop="touziyear">
                        <el-select v-model="infoForm.touziyear" size="mini" placeholder="请选择投资年限" >
                            <el-option label="1年" value="1"></el-option>
                            <el-option label="2年" value="2"></el-option>
                            <el-option label="3年" value="3"></el-option>
                            <el-option label="4年" value="4"></el-option>
                            <el-option label="5年" value="5"></el-option>
                            <el-option label="6年" value="6"></el-option>
                            <el-option label="7年" value="7"></el-option>
                            <el-option label="8年" value="8"></el-option>
                            <el-option label="9年" value="9"></el-option>
                            <el-option label="10年" value="10"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="绑定邮箱" prop="email">
                        <el-input v-model="infoForm.email" size="mini" placeholder="请输入绑定邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定手机" prop="telphone">
                        <el-input v-model="infoForm.telphone" size="mini" placeholder="请输入绑定手机"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('infoForm')">提交</el-button>
                        <el-button @click="resetForm('infoForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            </el-col>

            <el-col :span="8">
                <div class="area">
                    <div class="pwdarea">
                        <p class="title">修改密码</p>
                            <el-form class="form"  :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="100px">
                            <el-form-item label="原密码" prop="password">
                                <el-input type="password" v-model="pwdForm.password" auto-complete="off" size="mini" placeholder="请输入原密码"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newpassword">
                                <el-input type="password" v-model="pwdForm.newpassword" auto-complete="off" size="mini" placeholder="请输入新密码"></el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码" prop="surepassword">
                                <el-input type="password" v-model="pwdForm.surepassword" auto-complete="off" size="mini" placeholder="请输入确认新密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('pwdForm')">提交</el-button>
                                <el-button @click="resetForm('pwdForm')">重置</el-button>
                            </el-form-item>
                            </el-form>
                    </div>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="area">
                    <div class="phonearea">
                            <p class="title">手机服务</p>
                            <el-form class="form"  :model="phoneForm" :rules="phoneRules" ref="phoneForm" label-width="110px">
                                <el-form-item label="当前绑定手机" prop="phone">
                                    <el-input v-model="phoneForm.phone" size="mini" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="基础短信服务" prop="baseType">
                                    <el-checkbox-group v-model="phoneForm.baseType" class="phoneGroup">
                                        <el-checkbox label="网站密码找回"   name="baseType"></el-checkbox>
                                        <el-checkbox label="提现申请短信验证"  name="baseType"></el-checkbox>
                                        <el-checkbox label="提现申请提醒"   name="baseType"></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="可选短信服务" prop="changeType">
                                    <el-checkbox-group v-model="phoneForm.changeType" class="phoneGroup">
                                        <el-checkbox label="投标通知" name="changeType"></el-checkbox>
                                        <el-checkbox label="满标/流标/撤销通知" name="changeType"></el-checkbox>
                                        <el-checkbox label="回款通知" name="changeType"></el-checkbox>
                                        <el-checkbox label="本息保障通知" name="changeType"></el-checkbox>
                                        <el-checkbox label="优质标提醒通知" name="changeType"></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                        
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('phoneForm')">提交</el-button>
                                <el-button @click="resetForm('phoneForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
   import * as mutils from '@/utils/mUtils'

    export default {
        data(){
             // 附带callback(),是在明确通过验证的情况下去掉输入框上的loading
            let validateEmail = (rule, value, callback) => {
                if(value == ''){
                    callback(new Error('请输入邮箱~'));
                    return;
                }
                let emailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (!emailRegex.test(value)) {
                    callback(new Error('邮箱格式不正确！'))
                } else {
                    callback();
                }
            };
            let validatePhone = (rule, value, callback) => {
                if(value == ''){
                    callback(new Error('请输入手机号码~'));
                }{
                    let phoneRegex = /^1[34578]\d{9}$/;
                    if (!phoneRegex.test(value)) {
                        callback(new Error('手机号码格式不正确！'))
                    } else {
                        callback();
                    }
                }
            };
            // validateField:对部分表单字段进行校验的方法
            let validateNewpassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.pwdForm.surepassword !== '') {
                        this.$refs.pwdForm.validateField('surepassword');
                    }
                    callback();
                }
            };
            let validateSurepassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.pwdForm.newpassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                   callback();
                }
            };
            return {
               infoForm:{
                   username:'',
                   nickname:'',
                   touziyear:'',
                   email:'',
                   telphone:''
               },
               pwdForm:{
                   password:'',
                   newpassword:'',
                   surepassword:''
               },
               phoneForm:{
                   phone:'',
                   baseType:[],
                   changeType:[]
               },
               infoRules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    touziyear: [
                        { required: true, message: '请选择投资年限', trigger: 'change' }
                    ],
                    email: [
                        {required: true,validator: validateEmail,trigger: 'blur'}
                    ],
                    telphone: [
                        {required: true,validator: validatePhone, trigger: 'blur' },
                    ],
               },
               pwdRules: {
                    password: [
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                    ],
                    newpassword: [
                        { required: true, validator:validateNewpassword, trigger: 'blur' },
                    ],
                    surepassword: [
                        { required: true, validator:validateSurepassword, trigger: 'blur' },
                    ],
               },
               phoneRules:{
                   phone: [
                        {required: true,validator: validatePhone, trigger: 'blur' },
                   ],
                   baseType: [
                        { type: 'array', required: true, message: '请至少选择一个基础短信服务', trigger: 'change' }
                   ],
                   changeType: [
                        { type: 'array', required: true, message: '请至少选择一个可选短信服务', trigger: 'change' }
                   ],
               },
             
            };
           

        },
        created(){
           
        },
      	mounted() {
            // mutils.setContentHeight(this,this.$refs.fillcontain,170);
	    },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            showUsername(){
                let userinfo = mutils.getStore('userinfo');
                this.infoForm.username = userinfo.username;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(formName == 'pwdForm'){
                            this.showMessage('success','修改密码成功~');
                        }else if(formName == 'infoForm'){ // 判断手机服务是否为空
                            this.phoneForm.phone = this.infoForm.telphone;
                            for(let key in this.phoneForm){
                                if(this.phoneForm[key] == ''){
                                    this.showMessage('warning','请您选择手机服务~');
                                    return;
                                }
                            }
                        }else if(formName == 'phoneForm'){// 判断修改信息是否为空
                            this.infoForm.telphone = this.phoneForm.phone;
                            for(let key in this.infoForm){
                                if(this.infoForm[key] == ''){
                                    this.showMessage('warning','请您修改相关信息~');
                                    return;
                                }
                            }
                        }
                        //保存修改的相关信息
						let userinfo = this.infoForm;
                        let phoneinfo = this.phoneForm;
						let userData = Object.assign(userinfo, phoneinfo);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style lang="less" scoped>
    .info_container{
       padding: 20px;
       background: #fff;
       box-sizing: border-box;
       overflow: auto;
    }
     .title{
        text-align:center;
        width:100%;
        height:30px;
        line-height:30px;
        cursor: pointer;
        background-color: #3bc5ff;
        border:1px solid #3bc5ff;
        color: white;
        display: block;
    }
   .info_row{
        .area{
           border:1px solid #dfdfdf;
           height:100%;
           font-size:14px;
           padding:10px;
           .form{
               width:90%;
               margin-top:20px;
           }
        }
   }
</style>


