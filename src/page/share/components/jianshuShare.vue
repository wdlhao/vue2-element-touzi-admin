<template>
    <div class="shareArea cflex">
		<p class="shareTitle">分享组件三：仿简书底部分享</p>
		<div class="bottom cflex">
			<ul class="shareUl rflex wflex">
				<li>
					<div class="item" @click="shareToWeixin()">
						<icon-svg icon-class="iconwechat" />
					</div>
				</li>
				<li>
					<div class="item" @click="shareToWeibo()">
						<icon-svg icon-class="iconweibo" />
					</div>
				</li>
				<li>
					<div class="item" @click="shareToQQ()">
						<icon-svg icon-class="iconqq" />
					</div>
				</li>
				<li>
					<el-button class="moreBtn" v-popover:moreShareList>
						更多分享
						<el-popover
							ref="moreShareList"
							popper-class="moreShareList"
							placement="top"
							trigger="click">
								<div>
									<ul class="cflex">
										<a href="#" @click="shareToQQzone()">
											<li>
												<icon-svg icon-class="iconqq_zone" />
												<span>分享到QQ空间</span>
											</li>
										</a>
										<a href="#" @click="shareToDouban()">
											<li>
												<icon-svg icon-class="icondouban" />
												<span>分享到豆瓣</span>
											</li>
										</a>
										<a href="#">
											<li>
												<icon-svg icon-class="icontwitter" />
												<span>分享到Witter</span>
											</li>
										</a>
										<a href="#">
											<li>
												<icon-svg icon-class="iconfacebook" />
												<span>分享到Facebook</span>
											</li>
										</a>
										<a href="#">
											<li>
												<icon-svg icon-class="icongoogle" />
												<span>分享到Google</span>
											</li>
										</a>
									</ul>
								</div>
					   </el-popover>
					</el-button>
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
	export default {
	  name:'jianshuShare',
	  data(){
			return {
				
			}
		},
		mounted(){
		},
		methods: {
			shareToWeixin(){
                this.$emit('shareToWeixin');
			},
			shareToQQ(){
                this.$emit('shareToQQ');
			},
			shareToQQzone(){
                this.$emit('shareToQQzone');
			},
			shareToWeibo(){
                this.$emit('shareToWeibo');
            },
			shareToDouban(){
                this.$emit('shareToDouban');
			}

		}
	}
</script>

<style lang="less" scoped>
	.shareArea{
		width: 320px;
		align-items: center;
		background: #fff;
		border-radius: 4px;
         .shareTitle{
            border-bottom: 1px solid #e8e8e8;
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            font-size:14px;
        }
		.bottom{
			align-items: center;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding: 20px 10px;
			.title{
				padding: 10px;
				box-sizing: border-box;
				width: 100%;
				font-size:14px;
			}
			.shareUl{
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 0 10px;
				box-sizing: border-box;
				li{
						display: flex;
						flex-direction: column;
						align-items: center;
						position: relative;
						cursor: pointer;
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
						.moreBtn{
							position: relative;
							font-size:14px;
							width:auto;
							height:40px;
							text-align: center;
							padding: 4px 18px;
							border-radius:50px;
							border: 1px solid #dcdcdc;
						}
						.qrcodeArea{
							position: absolute;
							top: 50px;
							left: -30px;
							text-align: center;
							border: 1px solid #a9d86e;
							border-radius: 4px;
							padding: 10px;
							background: #fff;
							.saoTitle{
								font-size: 14px;
								color:#a9d86e;
								margin-bottom: 5px;
							}
						}
				}
			}
			.shareIntro{
			    padding: 10px;
				box-sizing: border-box;
				width: 100%;
				font-size:12px;
			}
		}
     
	}
	
</style>
