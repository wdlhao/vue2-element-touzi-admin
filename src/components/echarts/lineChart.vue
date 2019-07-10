<template>
    <div :id="id" class="orderArea"></div>
</template>

<script>
	import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json";
    
    export default {
        data(){
            return {
				id:"lineChart",
                myChart:null,
            }
        },
        mounted(){
            this.loadChart();
        },
		beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
        methods: {
			loadChart(){
  				this.$nextTick(() => {
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros');
                    this.myChart.setOption(this.initOption());
                })
			},
			initOption(){
				let data = {
					title: {
						text: ''
					},
					tooltip : {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
						data:['股票','基金','债券','储蓄','期货']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : ['周一','周二','周三','周四','周五','周六','周日']
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:'股票',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[120, 132, 101, 134, 90, 230, 210]
						},
						{
							name:'基金',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[220, 182, 191, 234, 290, 330, 310]
						},
						{
							name:'债券',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[150, 232, 201, 154, 190, 330, 410]
						},
						{
							name:'期货',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[320, 332, 301, 334, 390, 330, 320]
						},
						{
							name:'储蓄',
							type:'line',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							areaStyle: {normal: {}},
							data:[820, 932, 901, 934, 1290, 1330, 1320]
						}
					]
				}
				return data;
			},
		},
        watch: {
            // id:()=>{
            //     this.initOption()
            // }
        }
    }
</script>

<style lang="less">

</style>
