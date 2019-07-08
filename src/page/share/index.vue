<template>
  	<div class="fillcontain">
        <heng-share 
				   @creatQrCode="creatQrCode" 
					 @shareToQQ="shareToQQ" 
					 @shareToQQzone="shareToQQzone" 
					 @shareToWeibo="shareToWeibo" 
					 @shareToDouban="shareToDouban"
					 >
				</heng-share>
  	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import { shareUrl,shareTitle,weibo } from "@/utils/env";
	import HengShare from "./components/hengShare";

	export default {
	  data(){
			return {
				qrcode:{
					show:false
				},
				qrcodeObj:{
					text:shareUrl, // 要分享的网页路径
					width:80,
					height:80,
					colorDark: '#000000',
					colorLight: '#ffffff',
					correctLevel: QRCode.CorrectLevel.H
				},
				sanFangImgs:{
					wechat:require('@/assets/img/wechat.png'),
					qqs:require('@/assets/img/qqs.png'),
					weibo:require('@/assets/img/weibo.png'),
					gitHub:require('@/assets/img/gitHub.png'),
					qqZone:require('@/assets/img/qqZone.png'),
					douban:require('@/assets/img/douban.png')
				}
			}
		},
		components:{
			HengShare
		},
		mounted(){
			this.creatQrCode();

		},
		methods: {
			showqrcode(){
				this.qrcode.show  = true;
			},
			hideqrcode(){
				this.qrcode.show  = false;
			},
			// showStyle(type){
			// 	switch(type){
			// 		case 'weixin':
			// 		  this.isactiveweixin = true;
			// 		break;
			// 		case 'qq':
			// 		  this.isactiveqq = true;
			// 		break;
			// 		case 'qqZone':
			// 		  this.isactiveqqZone = true;
			// 		break;
			// 		case 'weibo':
			// 		  this.isactiveweibo = true;
			// 		break;
			// 		case 'douban':
			// 		  this.isactivedouban = true;
			// 		break;
			// 	}
			// },
			// hideStyle(type){
			// 	switch(type){
			// 		case 'weixin':
			// 		  this.isactiveweixin = false;
			// 		break;
			// 		case 'qq':
			// 		  this.isactiveqq = false;
			// 		break;
			// 		case 'qqZone':
			// 		  this.isactiveqqZone = false;
			// 		break;
			// 		case 'weibo':
			// 		  this.isactiveweibo = false;
			// 		break;
			// 		case 'douban':
			// 		  this.isactivedouban = false;
			// 		break;
			// 	}
			// },
			creatQrCode() {
				 const qrcode = new QRCode(this.$refs.qrCodeUrl, this.qrcodeObj)
			},
			shareToQQ(){
				this.shareConfig('qq')
			},
			shareToQQzone(){
				this.shareConfig('qqZone')
			},
			shareToWeibo(){
				this.shareConfig('weibo')
			},
			shareToDouban(){
				this.shareConfig('douban')
			}

		}
	}
</script>

<style lang="less" scoped>
	.shareArea{
		width: 340px;
		align-items: center;
		background: #fff;
		border-radius: 4px;
		.bottom{
			align-items: center;
			padding: 20px 10px;
			width: 100%;
      box-sizing: border-box;
			 .shareUl{
					justify-content: space-between;
						li{
								display: flex;
								flex-direction: column;
								align-items: center;
								position: relative;
								cursor: pointer;
								.title{
									margin-bottom: 10px;
									font-size: 13px;
									color:#a9d86e;
								}
								.item{
									background: #EFF2F7;
									width: 40px;
									height: 40px;
									border-radius: 50%;
									display: flex;
									justify-content: center;
									align-items: center;
									.svg-icon{
										font-size: 24px;
									}
									.active{
										color:#FF6C60;
									}
								}
								.qrcodeArea{
									position: absolute;
									top: 50px;
									left: -30px;
									text-align: center;
									border: 1px solid #a9d86e;
									border-radius: 4px;
									padding: 10px;
									.saoTitle{
											font-size: 14px;
										color:#a9d86e;
										margin-bottom: 5px;
									}
								}
						}
	    }
		}
     
	}
	
</style>
