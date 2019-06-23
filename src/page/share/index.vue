<template>
  	<div class="fillcontain">
         <div class="shareArea">
		    <ul class="shareUl rflex">
				<li>
					<p class="title">分享到微信</p>
					<div class="item" @mouseover="showqrcode()" @mouseout="hideqrcode()">
						<i :class="['fa fa-wechat',isactiveweixin?'active':'']"></i>
					</div>
					<div class="qrcodeArea" v-show="qrcode.show">
					   <p class="saoTitle">扫一扫</p>
					   <div class="qrcode" ref="qrCodeUrl" ></div>
					</div>
				</li>
				<li>
					<p class="title">分享到QQ</p>
					<div class="item" @click="shareToQQ()" @mouseover="showStyle('qq')" @mouseout="hideStyle('qq')">
						<i :class="['fa fa-qq',isactiveqq?'active':'']"></i>
					</div>
				</li>
				<li>
					<p class="title">分享到QQ空间</p>
					<div class="item" @click="shareToQQzone()" @mouseover="showStyle('qqZone')" @mouseout="hideStyle('qqZone')">
						<i :class="['fa fa-qq',isactiveqqZone?'active':'']"></i>
					</div>
				</li>
				<li>
					<p class="title">分享到微博</p>
					<div class="item" @click="shareToWeibo()" @mouseover="showStyle('weibo')" @mouseout="hideStyle('weibo')">
						<i :class="['fa fa-weibo',isactiveweibo?'active':'']"></i>
					</div>
				</li>
				<li>
					<p class="title">分享到豆瓣</p>
					<div class="item" @click="shareToDouban()" @mouseover="showStyle('douban')" @mouseout="hideStyle('douban')">
						<i :class="['fa fa-mars-double',isactivedouban?'active':'']"></i>
					</div>
				</li>
			</ul>
         </div>
  	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import { shareUrl,shareTitle,weibo } from "@/utils/env";

	export default {
	  data(){
			return {
				isactiveweixin:false,
				isactiveqq:false,
				isactiveqqZone:false,
				isactiveweibo:false,
				isactivedouban:false,
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
				this.showStyle('weixin');
			},
			hideqrcode(){
				this.qrcode.show  = false;
				this.hideStyle('weixin');
			},
			showStyle(type){
				switch(type){
					case 'weixin':
					  this.isactiveweixin = true;
					break;
					case 'qq':
					  this.isactiveqq = true;
					break;
					case 'qqZone':
					  this.isactiveqqZone = true;
					break;
					case 'weibo':
					  this.isactiveweibo = true;
					break;
					case 'douban':
					  this.isactivedouban = true;
					break;
				}
			},
			hideStyle(type){
				switch(type){
					case 'weixin':
					  this.isactiveweixin = false;
					break;
					case 'qq':
					  this.isactiveqq = false;
					break;
					case 'qqZone':
					  this.isactiveqqZone = false;
					break;
					case 'weibo':
					  this.isactiveweibo = false;
					break;
					case 'douban':
					  this.isactivedouban = false;
					break;
				}
			},
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
					.active{
						color:#FF6C60;
					}
				}
				.qrcodeArea{
					position: absolute;
					top: 120px;
					left: 0px;
					text-align: center;
					border:1px solid #a9d86e;
					border-radius: 8px;
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
	
</style>
