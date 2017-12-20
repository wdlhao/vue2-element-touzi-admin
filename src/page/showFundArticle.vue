<template>
    <div class="fillcontain">
        <div class="articeContent">
            <div class="titleContent">
                <h1 class="title">{{articleData.title}}</h1>
                <p class="other-info">
                   <span><b>{{articleData.comeFrom}}</b></span> | <span>{{articleData.author}}</span> | <span>{{articleData.publishDate}}</span>
                </p>
            </div>
            <br/>
            <div class="abstracts">摘要：  {{articleData.abstracts}}</div>
            <div id="articeContent" class="content"></div>
            <div class="footer">编辑：<b>{{articleData.author}}</b> | 责任编辑：<b>{{articleData.author}}</b></div>
        </div>
    </div>
</template>

<script>
    import dtime from 'time-formater'
    import * as mutils from 'utils/mUtils'
    import {axios} from 'utils/'

    export default {
        data(){
            return {
                articleData:{},
                id:'',
            }
        },
        created(){
            const row = this.$route.query.row;
            if(row === undefined){
                this.id = '59e8cf9aa0495816a893e7c6';
                this.getList({
                    id:this.id,
                    fun: () => {}
                });

            }else{
               this.articleData = row;
            }
        },

       mounted() {
           if(!this.id){
                this.$$lib_$("#articeContent").html(this.articleData.content);
           }

	   },
       methods: {
            getList({
                id,
                where,
                fun
            } = {}){
                var data = {
                   id:id
                };
                if (where) {
				   data = Object.assign(data, where || {});
                } 
                axios({
                    type:'get',
                    path:'/api/article/getFundArticlesById',
                    data:data,
                    fn:data=>{
                        this.articleData = data.data[0];
                        this.articleData.publishDate = mutils.formatDate(new Date(this.articleData.publishDate),3);
                        this.$$lib_$("#articeContent").html(this.articleData.content);
                    	
                        fun && fun();//其他函数
                    }
                })
           },
        
       }
           
    }
</script>

<style lang="less" scoped>
    .articeContent{
        width:100%;
        height:100%;
        padding:20px 0px;
    }
    .titleContent {
        text-align:center;
        margin:0px 100px 10px 100px;
        .title{
           font-size:18px;
           letter-spacing: 3px;
        }
        .other-info{
           line-height: 30px;
           font-size: 14px;
        }
    }
    .abstracts{
        padding:10px;
        margin:0px 100px 30px 100px;
        color: #999;
        text-indent: 2em;
         line-height:30px;
        border:1px dotted;
    }
    .content{
         line-height:30px;
         margin:0px 100px 30px 100px;
        // border:1px solid;
    }
    .footer{
         font-size:14px;
         margin:0px 100px 30px 100px;
        // border:1px solid;

    }
   
     
</style>


