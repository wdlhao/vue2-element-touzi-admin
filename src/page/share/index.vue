<template>
  	<div class="shareContainer" ref="shareContainer">
		<el-row :gutter="20">
			<el-col :span="6">
			  <heng-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></heng-share>
			</el-col>
			<el-col :span="6">
			   <invite-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></invite-share>
			</el-col>
			<el-col :span="6">
			  <jianshu-share @shareToWeixin="shareToWeixin" @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></jianshu-share>
			</el-col>
			<el-col :span="6">
			  <jianshu-left-share @shareToWeixin="shareToWeixin" @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></jianshu-left-share>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="6">
		       <info-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></info-share>
			</el-col>
			<el-col :span="6">
			  <juejin-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></juejin-share>
			</el-col>
			<el-col :span="6">
		      <sina-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></sina-share>
			</el-col>
			<el-col :span="6">
		      <yan-share @shareToQQ="shareToQQ" @shareToQQzone="shareToQQzone" @shareToWeibo="shareToWeibo" @shareToDouban="shareToDouban"></yan-share>
			</el-col>
		</el-row>
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
    import * as mutils from '@/utils/mUtils'

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
			mutils.setContentHeight(this,this.$refs.shareContainer,210);
		},
		methods: {
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
		padding: 20px;
		.el-row:first-child{
			margin-bottom: 20px;
		}
		.el-row{
			height:210px;
			.el-col{
				height:100%;
				.shareArea{
					height: 100%;
					width:100%;
				}
			}
		}
	}
</style>
