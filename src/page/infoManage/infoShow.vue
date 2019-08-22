<template>
    <div class="fillcontain">
        <!--个人信息栏-->
        <div class="info_container">
        <el-row class="info_row" :gutter="10">
                <el-col :span="4">
                <div class="area">
                    <div class="imgarea">
                        <img :src="avatarImg">
                         <el-button type="success" size="mini">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                    </div>
                </div>
                </el-col>

                <el-col :span="5">
                <div class="area">
                    <div class="namearea">
                        <p>姓名：王小川</p>
                        <p>昵称：PW68061826</p>
                        <p>投资年限：5年</p>
                        <p>绑定邮箱：9061446xx@qq.com</p>
                        <p>绑定手机：189xxxx9028</p>
                        <p class="awards"><i class="el-icon-date el-icon--left"></i>签到有奖</p>
                    </div>
                </div>
                </el-col>

                <el-col :span="9">
                <div class="area">
                    <div class="moneyarea">
                        <p class="title">可用现金:</p>
                        <p class="title"><span class="money">0.00</span><span class="yuan">元</span></p>
                        </div>
                    <div class="chongzhiarea">
                        <img :src="toMPicimg"/>
                        <p class="chongzhi">
                            <el-button type="success" size="">我要出借</el-button>
                            <el-button type="warning" size="">充值</el-button>
                            <el-button type="danger" size="">提现</el-button>
                        </p>
                    </div>
                    <div class="tipsarea">
                        <p>您的每笔交易资金，都将接受银行全程存管   <a href="http://www.baidu.com" target="_blank">了解资金存管 》</a></p>
                    </div>
                </div>
                </el-col>
                <el-col :span="6">
                <div class="area">
                    <div class="dataarea">
                        <p class="gtitle"><i class="el-icon-date el-icon--left"></i>个人数据</p>
                        <div class="gdataarea clear">
                            <div class="gdata left">
                                <p class="num">20</p>
                                <p class="title">投资数量</p>
                            </div>
                            <div class="gdata left">
                                <p class="num">200</p>
                                <p class="title">关注的人</p>
                            </div>
                            <div class="gdata left">
                                <p class="num">3000</p>
                                <p class="title">粉丝</p>
                            </div>
                        </div>
                        <p class="morearea">谢谢您的关注，<a href="http://www.baidu.com" target="_blank">了解我的更多个人信息 》</a></p>
                    </div>
                </div>
                </el-col>
        </el-row>
        <!--资金信息栏-->
        <el-row class="data_row row" :gutter="10">
                <el-col :span="6">
                <div class="area">
                    <p class="title"><icon-svg icon-class="iconpay3" />待收资产</p> 
                    <p class="num"><span class="symbol">￥</span>78.00</p>
                    <a class="detail dbgcolor">查看详情&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></a>
                </div>
                </el-col>
                <el-col :span="6">
                    <div class="area">
                    <p class="title"><icon-svg icon-class="iconpay3" />账户总资产</p>
                    <p class="num"><span class="symbol">￥</span>2078.00</p>
                    <a class="detail zbgcolor">查看详情&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></a>
                </div>
                </el-col>
                <el-col :span="6">
                    <div class="area">
                    <p class="title"><icon-svg icon-class="iconpay3" />已得回报</p>
                    <p class="num"><span class="symbol">￥</span>1000.00</p>
                    <a class="detail dbgcolor">查看详情&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></a>
                </div>
                </el-col>
                <el-col :span="6">
                <div class="area">
                    <p class="title"><icon-svg icon-class="iconpay3" />期待回报</p>
                    <p class="num"><span class="symbol">￥</span>3000.00</p>
                    <a class="detail zbgcolor">查看详情&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></a>
                </div>
                </el-col>
        </el-row>
        <!--广告信息栏-->
        <el-row class="ban_row row" :gutter="10">
            <el-col :span="24">
                <ul class="banarea">
                    <li v-for="(item,index) in bandata" :key="index">
                        <a :href="item.url" target="_blank" :style="{backgroundPosition:0 +' -'+ item.data+'px'}"></a>
                    </li>
                </ul>
            </el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
               bandata:[
                   {url:'http://www.baidu.com',data:300},
                   {url:'http://www.sina.com',data:200},
                   {url:'http://www.360.com',data:100},
                   {url:'http://www.weibo.com',data:0},
                   {url:'http://www.hao123.com',data:100},
               ],
               avatarImg: require('@/assets/img/avatar-2.jpg'),
               toMPicimg: require('@/assets/img/toMPic02.png')
            }
        },
      	mounted() {
         
	    },
        methods: {
        },
    }
</script>

<style lang="less" scoped>
    .info_container{
       padding: 20px;
       background: #fff;
       box-sizing: border-box;
       overflow: auto;
    }
    .row{
        margin:20px;
    }
   .info_row{
        .area{
           border:1px solid #dfdfdf;
           height:178px;
           overflow:hidden;
            .imgarea{
                text-align:center;
                padding:10px;
                img {
                    width:120px;
                    height:120px;
                    border-radius: 50%;
                }
            }
            .namearea{
                padding:10px;
                font-size:14px;
                p{
                    line-height:24px;
                }
                .awards{
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
                .awards:hover{
                    background-color: #f9c855;
                    border:1px solid #f9c855;
                }
            }
            .moneyarea{
                padding:10px;
                float:left;
                .title{
                    font-size:15px;
                    font-weight:bolder;
                    line-height:50px;
                    .money{
                        color:#c10000;
                        margin-right:5px;
                    }
                    .yuan{
                            font-weight:100;
                            font-size:13px;
                    }
                }
                
            }
            .chongzhiarea{
                    padding:10px;
                    text-align:center;
                    img{
                        width: 80%;
                        height: 40px;
                    }
                    .chongzhi{
                        margin-top:10px;
                    }
            }
            .tipsarea{
                clear:both;
                font-size:14px;
                padding:10px;
                padding-top:15px;
                a{
                    color:#3bc5ff;
                }
            }
            .dataarea{
                 padding:10px;
                 text-align:center;
                 font-size:14px;
                .gtitle{
                    width:100%;
                    height:30px;
                    line-height:30px;
                    cursor: pointer;
                    background-color: #3bc5ff;
                    color: white;
                    display: block;
                }
                .gdataarea{
                    padding-left: 25px;
                    p{
                        line-height:38px;
                    }
                    .num{
                        font-weight:bolder;
                        color:#c10000;
                    }
                    .title{
                        color:#3bc5ff;
                    }
                    .gdata{
                        margin:10px;
                    }
                }
                .morearea{
                    a{
                        color:#3bc5ff;
                    }
                }
            }
        }
   } 
   .data_row{
       font-size:18px;
       .area{
           border:1px solid #dfdfdf;
           height:200px;
           overflow:hidden;
           padding:10px;
           text-align:center;
           font-weight:bolder;
            .symbol{
                font-size: 16px;
                font-style: italic;
                font-family: "microsoft yahei";
                margin-right: 10px;
                color:#232323;
                font-weight:100;
            }
           p{
               line-height:70px;
           }
           .num{
               color:#c10000;
           }
           .detail{
               margin-top:5px;
               font-size:14px;
               text-align: center;
               width: 100%;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                color: white;
                display: block;
                border:1px solid #3bc5ff;
           }
           .dbgcolor{
              background-color: #3bc5ff;
           }
           .zbgcolor{
               color:#3bc5ff;
           }
           .dbgcolor:hover{
                background-color: #fff;
                color:#3bc5ff
           }
           .zbgcolor:hover{
                background-color: #3bc5ff;
                color:#fff;
           }
       }
   }
   .ban_row{
        .banarea{
            width: 100%;
            display: flex;
            justify-content: space-between;
            li{
                a{
                    background: url(../../assets/img/pro_map.gif?v=1.0) no-repeat;
                    width: 200px;
                    height: 50px;
                    display: block;
                }
            }
        }
   }
</style>


