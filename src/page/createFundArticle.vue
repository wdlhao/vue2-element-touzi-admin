<template>
    <div class="fillcontain">
        <div class="articleContainer">
            <el-form 
                :inline="true" 
                :model='articleData' 
                ref="articleData" 
                :rules="rules"
                class="demo-form-inline">
              <div class="form-content">
                 <el-row>
                    <el-col :span="24">

                         <div class="publish-container">
                            <el-button type="primary" class="publish"  @click='publishArticle("articleData","publish")'>发布</el-button>
                            <el-button type="warning" class="saveNote" @click='publishArticle("articleData","draft")'>草稿</el-button>
                         </div>

                         <div class="title-container">
                            <el-form-item  label="标题:" prop="title">
                                <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入标题" v-model="articleData.title">
                                </el-input>
                            </el-form-item>
                
                            <el-form-item  label="摘要:" prop="abstracts">
                                <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入摘要" v-model="articleData.abstracts">
                                </el-input>
                            </el-form-item>
                        </div>
                   
                         <div class="condition-container">
                                <el-form-item class="item" label="作者:" prop="author">
                                    <el-select v-model="articleData.author" placeholder="作者">
                                       <el-option v-for="item in authorData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                 <el-form-item class="item" label="类目:" prop="category">
                                    <el-select v-model="articleData.category" placeholder="类目">
                                       <el-option v-for="item in categoryData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="item" label="来源:" prop="comeFrom">
                                    <el-select v-model="articleData.comeFrom" placeholder="来源">
                                       <el-option v-for="item in comeFromData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                               <el-form-item class="item" label="重要性:" prop="important">
                                    <el-select v-model="articleData.important" placeholder="重要性">
                                       <el-option v-for="item in importantData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                               <el-form-item  label="发布日期:" prop="publishDate"> 
                                 <el-date-picker
                                    v-model="articleData.publishDate"
                                    type="datetime"
                                    class="datetime"
                                    placeholder="选择日期时间">
                                 </el-date-picker>
                              </el-form-item>
                         </div>
              
                    </el-col>
                </el-row>

                <div class="form-tinymce-container">
                   <!--组件-->
                    <Tinymce ref="editor" v-model="articleData.content"></Tinymce>
                </div>
               
             </div>


            </el-form>
        </div>

    </div>
</template>

<script>
    import Tinymce from 'cps/Tinymce';
    import dtime from 'time-formater'
    import * as mutils from 'utils/mUtils'
    import {axios} from 'utils/'

    export default {
        components: { Tinymce },
        data(){
            return {
                content: 'Tinymce',
                articleData:{
                    title:'',
                    abstracts:'',
                    author:'',
                    category:'',
                    comeFrom:'',
                    important:'',
                    publishDate:'',
                    content:''
                },
                authorData:[
                    {'label':'张小明','value':0},
                    {'label':'李鹏飞','value':1},
                    {'label':'王亚兰','value':2},
                    {'label':'吴明东','value':3},
                    {'label':'张琪格','value':4},
                    {'label':'黄雅丽','value':5}
                ],
                categoryData:[
                    {'label':'军事','value':0},
                    {'label':'社会','value':1},
                    {'label':'财经','value':2},
                    {'label':'科技','value':3},
                    {'label':'娱乐','value':4},
                    {'label':'互联网','value':5}
                ],
                 comeFromData:[
                    {'label':'人民网','value':0},
                    {'label':'央视新闻','value':1},
                    {'label':'新浪新闻','value':2},
                    {'label':'腾讯新闻','value':3},
                    {'label':'凤凰资讯','value':4},
                    {'label':'新华社','value':5}
                ],
                 importantData:[
                    {'label':'1','value':0},
                    {'label':'2','value':1},
                    {'label':'3','value':2},
                    {'label':'4','value':3},
                    {'label':'5','value':4}
                ],
                rules: {
                    title: [{ required: true,message: '文章标题为必填项~',trigger : 'blur' }],
                    abstracts: [{ required: true,message: '文章摘要为必填项~' ,trigger : 'blur'}],
                    author: [{ required: true, message: '请选择文章作者', trigger: 'change'}],
                    category: [{ required: true, message: '请选择文章类目', trigger: 'change' }],
                    comeFrom: [{ required: true, message: '请选择文章来源', trigger: 'change' }],
                    important: [{ required: true, message: '请选择文章重要性', trigger: 'change' }],
                    publishDate: [{ required: true, message: '请选择发布日期', trigger: 'change' }]
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
      	mounted() {
          
	    },
        methods: {
            //发布文章
            publishArticle(articleData,type){
                this.$refs[articleData].validate((valid) => {
                    if (valid) {//表单数据验证完成之后，提交数据;
                        let content = this[articleData].content;
                        if(content === ''){
                            this.$message({
                                message: '输入内容为必填项',
                                type: 'error'
                            });
                            return;
                        }
                        let formData = this[articleData];
                        let data = {};
                        for(var i in formData){
                            data.title = formData['title']
                            data.abstracts = formData['abstracts']
                            data.author = this.authorData[formData['author']]['label']
                            data.category = this.categoryData[formData['category']]['label']
                            data.comeFrom = this.comeFromData[formData['comeFrom']]['label']
                            data.important = this.importantData[formData['important']]['label']
                            data.publishDate = dtime(formData['publishDate']).format('YYYY-MM-DD HH:mm:ss')
                            data.content = formData['content']
                        }
                        if(type == 'publish'){
                            data.status = '1';  // 发布
                        }else{
                            data.status = '2';  // 草稿
                        }
                        console.log(data);
                        this.addFundArtices(data)
                    }
                })
            },
            addFundArtices(data){
                 axios({
                    type:'get',
                    path:'/api/article/addFundArtices',
                    data:data,
                    fn:res=>{
                        console.log(res);
                         if(res.status == 1){
                            this.$message({title:'新增成功,您可以去编辑文章页面查看哦~',type:'success'});
                            //实现菜单跳转，重定向
                            this.$router.push({path: '/modifyFundArticle'});
                         }else{
                            this.$message.error('新增失败请重试')
                         }
                    },
                    errFn:(err)=>{
                        this.$message.error('新增失败请重试,'+err)
                    }
                })
            }

        },
    }
</script>



<style lang="less" scoped>
    .publish-container{
        height: 50px;
        line-height: 50px;
        background-color: #38A884;
        border-color: #4db3ff;
        color: #fff;
        text-align: right;
        padding: 0 10px;
        margin-bottom:10px;
    }
    .title-container{
         margin-bottom:20px;
        .article-textarea{
            min-width:1000px;
        }
    }
    .condition-container{
        .item{
            float:left;
        }
    }
   .form-tinymce-container{
       margin-bottom:100px;
   }
     
</style>


