<template>
  	<div class="fillcontain">
         <div class="shareArea">
		    <ul class="shareUl rflex">
				<li>
					<p class="title">分享到微信</p>
					<div class="item" @mouseover="showqrcode()" @mouseout="hideqrcode()">
						<img :src="sanFangImgs.wechat" alt="">
					</div>
					<div class="qrcodeArea" v-show="qrcode.show">
					   <p class="saoTitle">扫一扫</p>
					   <div class="qrcode" ref="qrCodeUrl" ></div>
					</div>
				</li>
				<li>
					<p class="title">分享到QQ</p>
					<div class="item" @click="shareToQQ()">
						<img :src="sanFangImgs.qqs" alt="">
					</div>
				</li>
				<li>
					<p class="title">分享到QQ空间</p>
					<div class="item" @click="shareToQQzone()">
						<img :src="sanFangImgs.qqZone" alt="">
					</div>
				</li>
				<li>
					<p class="title">分享到微博</p>
					<div class="item" @click="shareToWeibo()">
						<img :src="sanFangImgs.weibo" alt="">
					</div>
				</li>
				<li>
					<p class="title">分享到豆瓣</p>
					<div class="item" @click="shareToDouban()">
						<img :src="sanFangImgs.douban" alt="">
					</div>
				</li>
			</ul>
         </div>
  	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import { shareUrl } from "@/utils/env";

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
					img{
						width:32px;
						height:32px;
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
