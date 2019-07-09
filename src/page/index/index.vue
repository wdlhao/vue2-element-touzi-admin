<template>
		<section class="data_section" ref="data_section"> 
			<el-row :gutter="10" class="row_list">
				<el-col :span="3"><div class="pay data_list"><p class="list_number">+208.65</p><p>盈亏(千万)</p></div></el-col>
				<el-col :span="3"><div class="income data_list"><p class="list_number">+12.37</p><p>收益率(%)</p></div></el-col>
				<el-col :span="3"><div class="hidden_investors data_list"><p class="number">686</p><p></p>潜在投资人(人)</div></el-col>
				<el-col :span="3"><div class="intention_investors data_list"><p class="number">264</p><p>意向投资人(人)</p></div></el-col>
				<el-col :span="3"><div class="waitpending_investors data_list"><p class="number">137</p><p>待审投资人(人))</p></div></el-col>
				<el-col :span="3"><div class="pending_investors data_list"><p class="number">100</p><p></p>审核中投资人(人)</div></el-col>
				<el-col :span="3"><div class="pass_investors data_list"><p class="number">86</p><p>审核通过投资人(人)</p></div></el-col>
				<el-col :span="3"><div class="newadd_investors data_list"><p class="number">36</p><p>新增投资人(人)</p></div></el-col>
			</el-row>
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="7">
				    <ordertype id="bin1_data" type="ordertype"></ordertype>
				</el-col>
				<el-col :span="10">
					<bar-chart id="barChart" type="barChart"></bar-chart>
				</el-col>
			   	<el-col :span="7">
					<radar-chart id="radarChart"></radar-chart>
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
	import '../../../node_modules/echarts/theme/macarons.js';
	import salesTable from "./components/salesTable";  // 销售数据表格
	import commentList from "./components/commentList";  // 用户评论列表
	import cardList from "./components/cardList";  // card列表
	import ordertype from 'cps/echarts/ordertype' // 用户投资类型 饼状图
	import barChart from 'cps/echarts/barChart' // 用户投资类型 柱状图
	import radarChart from 'cps/echarts/radarChart' // 用户投资类型 雷达图

	import ordersource from 'cps/echarts/orderSource'
	import barTypeData from 'cps/echarts/barTypeData'
	import lineTypeData from 'cps/echarts/lineTypeData'

    export default {
    	data(){
    		return {
			  bar_chart: null,
			  line_chart:null,
			  bar_id:'bar_data',
			  line_id:'line_data',
    		}
    	},
    	components: {
		   salesTable,
		   commentList,
		   cardList,
		   barChart,
		   ordertype,
		   radarChart,

		   barTypeData,
		   lineTypeData,
		   ordersource
		},	
    	mounted(){
			this.setSectionHeight();
		},
		beforeDestroy() {
			if (!this.bar_chart || !this.line_chart) {
				return
			}
			this.bar_chart.dispose();
			this.line_chart.dispose();
			this.bar_chart = null;
			this.line_chart = null;
        },
    	methods: {
		   setSectionHeight(){
				this.$nextTick(() => {
				   this.$refs.data_section.style.height =  (document.body.clientHeight - 120)+'px';
				})
		   }
    	}
    }
</script>

<style lang="less" scoped>
	.data_section{
		margin: 20px;
		overflow: auto;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
		}
		.pay{
			background-color:#18a689;
		}
		.income{
			background-color:#99CC00;
		}
		.hidden_investors{
			background-color:#33CC99;
		}
		.intention_investors{
			background-color:#3b5999;
		}
		.waitpending_investors{
			background-color:#66CC99;
		}
        .pending_investors{
			background-color:#009999;
		}
		.pass_investors{
			background-color:#FF9900;
		}
		.newadd_investors{
			background-color:#0099CC;
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
		}
		.data_list{
			text-align: center;
			font-size: 14px;
            border-radius: 6px;
			padding: 15px 0;
			color:#fff;
			.list_number{
				font-size:16px;
				font-weight:bold;
			}
		    .number{
				font-size:16px;
				font-weight:bold;
			}
         
        }
     
	}
  
</style>
