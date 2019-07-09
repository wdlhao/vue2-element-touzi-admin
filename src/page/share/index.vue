<template>
  	<div class="fillcontain shareContainer" ref="shareContainer">
		<div class="shareItem rflex">
			<heng-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></heng-share>
			<invite-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></invite-share>
			<jianshu-share @shareToWeixin="shareToWeixin" @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></jianshu-share>
			<jianshu-left-share @shareToWeixin="shareToWeixin" @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></jianshu-left-share>
		</div>
		<div class="shareItem rflex">
		    <info-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></info-share>
			<juejin-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></juejin-share>
		    <sina-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></sina-share>
		    <yan-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></yan-share>
		</div>
		<wx-code-modal v-if="wxModal.show" :wxModal="wxModal" @hideWxCodeModal="hideWxCodeModal"></wx-code-modal>
  	</div>
</template>

<script>
	import {
		HengShare,
		InviteShare,
		JianshuShare,
		JianshuLeftShare,
		WxCodeModal,
		JuejinShare,
		InfoShare,
		SinaShare,
		YanShare
	} from "./components";

	export default {
	  data(){
			return {
				wxModal:{
					show:false,
					width:"358px",
					height:"358px",
				}
			}
		},
		components:{
			HengShare,
			InviteShare,
			JianshuShare,
			JianshuLeftShare,
			WxCodeModal,
			JuejinShare,
			InfoShare,
			SinaShare,
			YanShare
		},
		mounted(){
			this.setSectionHeight();
		},
		methods: {
			setSectionHeight(){
				this.$nextTick(() => {
				   this.$refs.shareContainer.style.height =  (document.body.clientHeight - 160)+'px';
				})
		    },
			hideWxCodeModal(){
				this.wxModal.show = false;
			},
			// 分享到微信，显示微信二维码弹框；
			shareToWeixin(){
				this.wxModal.show = true;
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
	.shareContainer{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
</style>
