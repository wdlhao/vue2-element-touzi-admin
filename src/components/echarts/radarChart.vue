<template>
    <div :id="id" class="orderArea"></div>
</template>

<script>
    import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json";
    
    export default {
        name:'radarChart',
        data(){
            return {
                 id:"radarChart",
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
                    this.myChart = echarts.init(document.getElementById(this.id));
                    this.myChart.setOption(this.initOption());
                })
            },
         	initOption(){
               let option = {
                    radar: [{
                    name: {
                        fontSize: 11 // 顶点字体大小 不能设置 radio 否则不能生效
                    },
                    splitLine: {
                        lineStyle: {
                          color: '#00aaff' // 每一圈的边界颜色
                        }
                    },
                    axisLabel: {
                        inside: true
                    },
                    axisLine: {
                        lineStyle: {
                          color: '#00aaff' // 半径线颜色
                        }
                    },
                    splitArea: {
                        areaStyle: {
                        // color: ['#00aaff', '#0099ff', '#00aaff', '#0099ff', '#00aaff'] // 每一圈的颜色
                        }
                    },
                    indicator: [
                        {text: '东北区域', max: 100, color: '#87DE75'}, // 选中颜色
                        {text: '华南区域', max: 100,color: '#FFA3A1'},
                        {text: '华中区域', max: 100,color: '#FF9900'},
                        {text: '华北区域', max: 100,color: '#5FB4FA'},
                        {text: '西北区域', max: 100,color: '#a9d86e'},
                        {text: '西南区域', max: 100,color: '#FF6C60'},
                        {text: '东北区域', max: 100,color: '#18a689'},
                        {text: '港澳台', max: 100,color: '#3b5999'}
                    ]
                    }],
                    series: [{
                    type: 'radar',
                    data: [{
                        value: [60, 73, 85, 40, 50, 100],
                        areaStyle: {
                        normal: {
                            opacity: 0.8, // 图表透明度
                            color: '#87DE75' // 图表颜色
                        }
                        },
                        lineStyle: {
                        color: '#6397ff' // 图表边框颜色
                        },
                        label: {
                        normal: {
                            show: true,
                            color: '#6397ff', // 顶点数字颜色
                            fontSize: 16,  // 顶点数字大小
                            formatter: function (params) {
                              return params.value
                            }
                        }
                        }
                    }]
                    }]
                }
				return option;
			},
        },
        watch: {
        }
    }
</script>

<style lang="less">

</style>
