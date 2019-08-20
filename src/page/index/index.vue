<template>
		<section class="data_section" ref="data_section"> 
			<a :href="github" target="_blank">
				<el-row :gutter="10" class="row_list">
					<el-col :span="8">
						<div class="row_left row_base">
							<el-col :span="12">
								<div class="pay saleBgcolor data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">{{ $t('index.yearLoss') }}</p>
										<p class="number">68<span class="perTitle">({{ $t('index.tenMillion') }})</span></p>
									</div>
									<div class="rightItem">
										<icon-svg icon-class="iconfukuan" />
									</div>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="pay taxBgcolor data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">{{ $t('index.yearProfit') }}</p>
										<p class="number">120<span class="perTitle">(%)</span></p>
									</div>
									<div class="rightItem">
										<icon-svg icon-class="iconpay3" />
									</div>
								</div>
							</el-col>
						</div>
					</el-col>
					<el-col :span="16">
						<div class="row_right row_base">
							<el-col :span="6">
								<div class="extenedBgcolor data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">{{ $t('index.potentialInvestor') }}</p>
										<p class="number">686<span class="perTitle">({{ $t('index.person') }})</span></p>
										<p class="cardText">Decreased by 10%</p>
									</div>
									<div class="rightItem">
										<icon-svg icon-class="iconpay2" />
									</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="likeBgcolor data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">{{ $t('index.intentionInvestor') }}</p>
										<p class="number">1276<span class="perTitle">({{ $t('index.person') }})</span></p>
										<p class="cardText">Decreased by 50%</p>
									</div>
									<div class="rightItem">
										<icon-svg icon-class="iconpay1" />
									</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="linkBgColor data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">{{ $t('index.waitExamineInvestor') }}</p>
										<p class="number">82367<span class="perTitle">({{ $t('index.person') }})</span></p>
										<p class="cardText">Decreased by 30%</p>
									</div>
									<div class="rightItem">
										<icon-svg icon-class="iconpay" />
									</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="keleBgColor data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">{{ $t('index.examiningInvestor') }}</p>
										<p class="number">827373<span class="perTitle">({{ $t('index.person') }})</span></p>
										<p class="cardText">Decreased by 80%</p>
									</div>
									<div class="rightItem">
										<icon-svg icon-class="iconfufei0" />
									</div>
								</div>
							</el-col>
						</div>
					</el-col>
				</el-row>
			</a>
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="7">
					<log-list></log-list>
				</el-col>
				<el-col :span="17">
					<bar-chart type="barChart"></bar-chart>
				</el-col>
			</el-row>
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="7">
				    <pie-chart type="ordertype"></pie-chart>
				</el-col>
				<el-col :span="10">
					<line-chart></line-chart>
				</el-col>
			   	<el-col :span="7">
					<radar-chart></radar-chart>
				</el-col>
			</el-row> 
			<el-row :gutter="10" class="row_list">
				<el-col :span="11">
					<sales-table></sales-table>
				</el-col>
				<el-col :span="7">
					<comment-list></comment-list>
				</el-col>
				<el-col :span="6">
					<card-list></card-list>
				</el-col>
			</el-row>
			
		</section>
</template>

<script>
	import echarts from 'echarts'
	import salesTable from "./components/salesTable";  // 销售数据表格
	import commentList from "./components/commentList";  // 用户评论列表
	import cardList from "./components/cardList";  // card列表
	import logList from "./components/logList";  // 日志列表
	import barChart from 'cps/echarts/barChart' // 用户投资类型 柱状图
	import pieChart from 'cps/echarts/pieChart' // 用户投资类型 饼状图
	import radarChart from 'cps/echarts/radarChart' // 用户投资类型 雷达图
	import lineChart from 'cps/echarts/lineChart' // 用户投资类型 折线图
	import { github } from "@/utils/env";

    export default {
    	data(){
    		return {
			  github:github
    		}
    	},
    	components: {
		   salesTable,
		   commentList,
		   cardList,
		   logList,
		   barChart,
		   pieChart,
		   radarChart,
		   lineChart
		},	
		created(){
		},
    	mounted(){
		},
    	methods: {
    	}
    }
</script>

<style lang="less" scoped>
	.data_section{
		margin: 20px;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
			.row_base{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 120px;
			}
		}
		.order_list{
			.orderArea{
				width: 100%;
				height: 300px;
				background: #fff !important;
				border-radius: 6px;
				box-sizing: border-box;
				padding: 10px;
				padding-top: 40px;
				overflow: hidden;
			}
			.orderbarArea{
				height: 370px;
			}
		}
		.data_list{
			text-align: center;
			font-size: 14px;
            border-radius: 6px;
			padding: 10px;
			color:#fff;
			height: 80px;
			.leftItem{
				align-items: start;
				justify-content: space-between;
				text-align: left;
			}
			.rightItem{
				width:62px;
				display: flex;
				align-items: center;
				justify-content: center;
				.svg-icon{
					font-size: 30px;
				}
			}
		    .number{
				font-size: 22px;
				font-weight: bold;
				.perTitle{
					font-size: 13px;
   				    margin-left: 5px;
				}
			}
		}
		.pay{
			.leftItem{
				justify-content: space-around;
			}
		}
     
	}
  
</style>
