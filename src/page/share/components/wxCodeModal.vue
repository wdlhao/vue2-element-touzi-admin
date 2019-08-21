<template>
    <el-dialog
    :append-to-body="true"
    :width="wxModal.width"
    :height="wxModal.height"
    :visible.sync="wxModal.show"
    :before-close="handleClose"
    >
        <div class="wxContent">
            <p class="qrtitle">打开微信“扫一扫”，打开网页后点击屏幕右上角分享按钮</p>
            <div class="qrcode" ref="qrCodeUrl5"></div>
        </div>
    </el-dialog>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import { shareUrl } from "@/utils/env";

	export default {
	  name:'wxCodeModal',
	  data(){
			return {
				qrcodeObj:{
					text:shareUrl, // 要分享的网页路径
					width:190,
					height:190,
					colorDark: '#000000',
					colorLight: '#ffffff',
					correctLevel: QRCode.CorrectLevel.H
				}
				
			}
        },
        props:{
            wxModal:Object
        },
		mounted(){

		},
		methods: {
            creatQrCode() {
                const qrcode = new QRCode(this.$refs.qrCodeUrl5, this.qrcodeObj)
			},
            handleClose(){
                this.$emit('hideWxCodeModal')
            }

        },
        watch:{
            'wxModal.show': {
                handler(newName, oldName) {
                    console.log(newName)
                    newName?this.creatQrCode():'';
                },
                deep: true,
                immediate: true
            }
        }
	}
</script>

<style lang="less" scoped>
  .wxContent{
         text-align: center;
         padding: 20px;
        .qrtitle{
            margin-bottom: 30px;
        }
        .qrcode{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
  }
	
</style>
