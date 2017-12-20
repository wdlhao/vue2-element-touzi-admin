<template>
    <div :id="id" style="width:100%;height:280px;"></div>
</template>

<script>
   	import echarts from 'echarts'
    
    export default {
        data(){
            return {
                 myChart:null,
            }
        },
        mounted(){
            this.myChart = echarts.init(document.getElementById(this.id));
            this.myChart.setOption(this.redyBin2Option(this.type));
        },
        props: ['id','type'],
        methods: {
         	redyBin2Option(type){
                let text,legend_data,series_data,inner_data;
				if(type == "ordersource"){
					text = "用户投资途径";
					legend_data = ['直达','营销广告','搜索引擎','邮件营销','联盟广告','谷歌']
                    inner_data = [
                        {value:335, name:'直达', selected:true},
                        {value:679, name:'营销广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
					series_data = [
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:634, name:'谷歌'}
					]
				}else{
					text = "用户投资职业";
					legend_data = ['金融人员','IT人员','保险人员','理财师','律师'];
                    inner_data = [
                        {value:335, name:'金融人员', selected:true},
                        {value:679, name:'IT人员'},
                        {value:1548, name:'保险人员'}
                    ]
					series_data = [
						{value:310, name:'理财师'},
						{value:528, name:'律师'},
					]
				}
				let data  = {
					title : {
						text: text,
						subtext: '纯属虚构',
						x:'center'
					},
					 tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data:legend_data
					},
					series: [
						{
							name:'访问来源',
							type:'pie',
							selectedMode: 'single',
							radius: [0, '30%'],
                            center: ['50%', '60%'],
							label: {
								normal: {
									position: 'inner'
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data:inner_data
						},
						{
							name:'访问来源',
							type:'pie',
							radius: ['40%', '55%'],
                            center: ['50%', '60%'],
							label: {
								normal: {
									backgroundColor: '#eee',
									borderColor: '#aaa',
									borderWidth: 1,
									borderRadius: 4,
									rich: {
										a: {
											color: '#999',
											lineHeight: 22,
											align: 'center'
										},
										hr: {
											borderColor: '#aaa',
											width: '100%',
											borderWidth: 0.5,
											height: 0
										},
										b: {
											fontSize: 16,
											lineHeight: 33
										},
										per: {
											color: '#eee',
											backgroundColor: '#334455',
											padding: [2, 4],
											borderRadius: 2
										}
									}
								}
							},
							data:series_data
						}
					]
				}
				return data;
			}
        },
        watch: {
            type:(v)=>{
                this.redyBin2Option(v)
            }
        }
    }
</script>

<style lang="less">

</style>
