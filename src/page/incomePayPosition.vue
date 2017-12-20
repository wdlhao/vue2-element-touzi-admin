<template>
    <div class="fillcontainer">
        <div :id="id" class="echartsPosition"></div> 
    </div>
</template>

<!--
<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
-->

<script>
    import echarts from 'echarts';

    export default {
        props: {
            id: {
                type: String,
                default: 'incomePayPosition'
            }
        },
        data() {
            return {
                chart: null
            };
        },
        mounted() {
            this.initChart();
            this.chart = null;
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null;
        },
        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));
                const data = {};
                (function() {
                    const xAxisData = [];
                    const seriesIncome = [];
                    const seriesPay = [];
                    const seriesaverage = [];
                    for (let i = 1; i < 13; i++) {
                        xAxisData.push(i + '月份');
                    }
                    data['xAxisData'] = xAxisData;

                    for (let i = 1; i < 13; i++) {
                       seriesIncome.push(Math.round(Math.random()*10000));
                       seriesPay.push(Math.round(Math.random()*10000));
                       seriesaverage.push(Math.round(Math.random()*10000));
                    }
                     data['seriesIncome'] = seriesIncome;
                     data['seriesPay'] = seriesPay;
                     data['seriesaverage'] = seriesaverage;
                }());
                this.chart.setOption({
                    backgroundColor: '#CCFFCC',
               // backgroundColor: '#344b58',
                title: {
                    text: '收支统计',
                    subtext: '单位/万元',
                    x: '4%',
                    textStyle: {
                        color: '#000000',
                        fontSize: '22'
                    },
                    subtextStyle: {
                        color: '#90979c',
                        fontSize: '12'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    textStyle: {
                        color: '#fff'
                    }
                    }
                },
                grid: {
                    borderWidth: 0,
                    top: 110,
                    bottom: 95,
                    textStyle: {
                        color: '#000000'
                    }
                },
                legend: {
                    x: '15%',
                    top: '10%',
                    textStyle: {
                        color: '#90979c'
                    },
                    data: ['收入', '支出', '平均']
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    axisLine: {
                    lineStyle: {
                        color: '#0099CC'
                    }
                    },
                    splitLine: {
                         show: false
                    },
                    axisTick: {
                         show: false
                    },
                    splitArea: {
                         show: false
                    },
                    axisLabel: {
                    interval: 0

                    },
                    data: data.xAxisData
                }],
                yAxis: [{
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                    lineStyle: {
                        color: '#0099CC'
                    }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0
                    },
                    splitArea: {
                        show: false
                    }
                }],
                dataZoom: [{
                    show: true,
                    height: 30,
                    xAxisIndex: [
                        0
                    ],
                    bottom: 30,
                    start: 10,
                    end: 80,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                       color: '#336699'
                    },
                    textStyle: {
                       color: '#000' 
                    },
                    borderColor: '#339999'
                }, {
                    type: 'inside',
                    show: true,
                    height: 15,
                    start: 1,
                    end: 35
                }],
                series: [{
                    name: '收入',
                    type: 'bar',
                    stack: '总量',
                    barMaxWidth: 35,
                    barGap: '10%',
                    itemStyle: {
                    normal: {
                        color: '#66CC99',
                        label: {
                            show: true,
                            textStyle: {color: '#fff'},
                            position: 'insideTop',
                            formatter(p) {return p.value > 0 ? p.value : '' }
                        }
                    }
                    },
                    data: data.seriesIncome
                },
                {
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                    normal: {
                        color: '#0099CC',
                        barBorderRadius: 0,
                        label: {
                        show: true,
                        position: 'top',
                        formatter(p) {
                            return p.value > 0 ? p.value : '';
                        }
                        }
                    }
                    },
                    data:data.seriesPay
                }, {
                    name: '平均',
                    type: 'line',
                    stack: '总量',
                    symbolSize: 10,
                    symbol: 'circle',
                    itemStyle: {
                    normal: {
                        color: '#FF9966',
                        barBorderRadius: 0,
                        label: {
                            show: true,
                            position: 'top',
                            formatter(p) {
                                return p.value > 0 ? p.value : '';
                            }
                        }
                    }
                    },
                    data:data.seriesaverage
                }
                ]
                })
            }
        }
    }

</script>


<style lang="less" scoped>
     
</style>


