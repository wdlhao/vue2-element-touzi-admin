<template>
    <div class="fillcontainer">
       <el-row :gutter="10"> 
          <el-col :span="12">
               <div id="typePosition"></div> 
          </el-col>
           <el-col :span="12">
               <div id="typePosition2"></div> 
          </el-col>
       </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import '../../node_modules/echarts/theme/vintage.js';

    export default {
        data(){
          return {
            chart:null,
            chart_bar:null,
            data:{
                legendData: ['储蓄','基金','股票','债券','期货'],
                seriesData:[
                    {value:this.randomData(), name:'储蓄'},
                    {value:this.randomData(), name:'基金'},
                    {value:this.randomData(), name:'股票'},
                    {value:this.randomData(), name:'债券'},
                    {value:this.randomData(), name:'期货'}
                ]
            }
          }
        },
        methods: {
          randomData() {
            return Math.round(Math.random()*1000000);
          },
          drawpie(id, radius, centery) {
            if ( this.chart &&  this.chart.dispose) { 
                 this.chart.dispose(); 
            } 
            this.chart = echarts.init(document.getElementById(id), 'vintage');
            this.chart.setOption({
               // backgroundColor: '#344b58',
                angleAxis: {},
                radiusAxis: {
                    type: 'category',
                    data: ['2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年'],
                    z: 10
                },
                polar: {},
                series: [{
                        type: 'bar',
                        data: [80, 20, 30, 40, 70, 50, 10],
                        coordinateSystem: 'polar',
                        name: '储蓄',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [60, 40, 60, 10, 30, 20, 10],
                        coordinateSystem: 'polar',
                        name: '基金',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [10, 80, 30, 40, 50, 20, 50],
                        coordinateSystem: 'polar',
                        name: '股票',
                        stack: 'a'
                    },{
                        type: 'bar',
                        data: [60, 20, 10, 80, 30, 20, 50],
                        coordinateSystem: 'polar',
                        name: '债券',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [90, 20, 10, 40, 10, 20, 50],
                        coordinateSystem: 'polar',
                        name: '期货',
                        stack: 'a'
                    }],
                    legend: {
                        show: true,
                        data: ['储蓄', '基金', '股票','债券','期货']
                    }
            });
          },
          drawbar(id){
            if ( this.chart_bar &&  this.chart_bar.dispose) { 
                this.chart_bar.dispose(); 
            } 
            this.chart_bar = echarts.init(document.getElementById(id),'vintage');
            this.chart_bar.setOption({
                 angleAxis: {
                        type: 'category',
                        data: ['2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年'],
                        z: 10
                    },
                    radiusAxis: {},
                    polar: {},
                    series: [{
                        type: 'bar',
                        data: [80, 20, 30, 40, 70, 50, 10],
                        coordinateSystem: 'polar',
                        name: '储蓄',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [60, 40, 60, 10, 30, 20, 10],
                        coordinateSystem: 'polar',
                        name: '基金',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [10, 80, 30, 40, 50, 20, 50],
                        coordinateSystem: 'polar',
                        name: '股票',
                        stack: 'a'
                    },{
                        type: 'bar',
                        data: [60, 20, 10, 80, 30, 20, 50],
                        coordinateSystem: 'polar',
                        name: '债券',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [90, 20, 10, 40, 10, 20, 50],
                        coordinateSystem: 'polar',
                        name: '期货',
                        stack: 'a'
                    }],
                    legend: {
                        show: true,
                        data: ['储蓄', '基金', '股票','债券','期货']
                    }
            })
          }
        },
        mounted() {
            this.$nextTick(function() {
                this.drawpie('typePosition');
                this.drawbar('typePosition2');

                var that = this;
                var resizeTimer = null;
                // 保证页面在放大或缩小时，也能够动态的显示数据
                window.onresize = function() {
                    if (resizeTimer) clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() {
                        that.drawpie('typePosition');
                        that.drawbar('typePosition2');
                    }, 100);
                }

            })
        }
    }
</script>

<style lang="less" scoped>
      #typePosition,#typePosition2 {
        position: relative;
        width: 90%;
        height: 530px;
        margin: 10px auto;
        box-shadow: 0 0 10px #A6E3E9;
        border-radius: 10px;
     }	
</style>


