<template>
  	<div class="fillcontain">
         <div class="shareArea">
					   <ul class="shareUl rflex">
							  <li>
									<p class="title">分享到微信</p>
									<div class="item" @mouseover="showqrcode()" @mouseout="hideqrcode()">
										  <i class="fa fa-wechat"></i>
									</div>
									<div class="qrcode" ref="qrCodeUrl" v-show="qrcode.show"></div>
								</li>
								<li>
									<p class="title">分享到QQ</p>
									<div class="item" @click="shareToQQ()">
										  <i class="fa  fa-qq"></i>
									</div>
								</li>
							  <li>
									<p class="title">分享到微博</p>
									<div class="item" @click="shareToWeibo()">
										  <i class="fa  fa-weibo"></i>
									</div>
								</li>
						 </ul>
         </div>
  	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import { shareUrl,weiboUrl } from "@/utils/env";

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
				}
				
			}
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
			creatQrCode() {
				 const qrcode = new QRCode(this.$refs.qrCodeUrl, this.qrcodeObj)
			},
			shareToQQ(){
        // "http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESC}}&pics={{IMAGE}}&summary={{SUMMARY}}"
			},
			shareToWeibo(){
				const weiboData = {
					 'url':shareUrl,
					 'title':'用Vue-cli3+element+mockjs 实现后台管理权限系统及顶栏三级菜单显示',
					 'searchPic':true,
					 'style':'simple'
				}
				this.shareConfig('weibo',weiboData)
			}

		}
	}
</script>

<style lang="less" scoped>
	.shareArea{
     .shareUl{
			  li{
					 display: flex;
					 flex-direction: column;
					 align-items: center;
					 margin-right: 50px;
					 position: relative;
					 cursor: pointer;
					 .title{
							margin-bottom: 10px;
							font-size: 13px;
							color:#a9d86e;
					 }
					 .item{
						  background: #fff;
							width: 80px;
							height: 80px;
							border-radius: 50%;
							display: flex;
							justify-content: center;
							align-items: center;
							.fa{
								font-size: 24px;
							}
					 }
					 .qrcode{
							position: absolute;
							top: 120px;
    				  left: 0px;
					 }
				}
		 }
	}
	
</style>
