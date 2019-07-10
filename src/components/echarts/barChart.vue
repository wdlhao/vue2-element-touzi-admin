<template>
    <div :id="id" class="orderArea orderbarArea"></div>
</template>

<script>
    import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json";
    export default {
        name:'barChat',
        data(){
            return {
                 id:'barChart',
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
                let option = {
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['访问量','下载量']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'访问量',
                            type:'bar',
                            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        },
                        {
                            name:'下载量',
                            type:'bar',
                            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                            markPoint : {
                                data : [
                                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                                ]
                            }
                        }
                    ]
                };
				return option;
			},
        },
        watch: {
        }
    }
</script>

<style lang="less">

</style>
