<template>
    <div class="fillcontain">
        <div class="excel_container">
             <el-button type="primary" icon='document' @click='exportToExcel()'>导出excel</el-button>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                align='center'>
            <el-table-column
                prop="ID"
                label="序号"
                align='center'
                width="80">
                <template slot-scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
             <el-table-column
                prop="provinces"
                label="省份"
                align='center'
                width="120">
            </el-table-column>
            <el-table-column
                prop="orderMoney"
                label="投资总额"
                align='center'
                width="120"
                sortable>
                <template slot-scope="scope">  
                    <span style="color:#CC0033">{{ scope.row.orderMoney }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="incomeMoney"
                label="收益金额"
                align='center'
                width="120"
                sortable>
                <template slot-scope="scope">  
                    <span style="color:#00d053;">+{{ scope.row.incomeMoney }}</span>
                </template>
            </el-table-column>
              <el-table-column
                prop="payType"
                label="主要投资项目"
                align='center'
                width="120">
              <template slot-scope="scope">
                <el-tag
                    type="info"
                        close-transition>
                    {{scope.row.payType}}
                </el-tag>
              </template>
            </el-table-column>
             <el-table-column
                prop="orderPeriod"
                label="投资周期"
                align='center'
                width="120">
            </el-table-column>
             <el-table-column
                prop="orderPersonConunt"
                label="投资人数"
                align='center'
                width="120"
                :formatter="formatterOrderPersonConunt"
                >
            </el-table-column>
              <el-table-column
                prop="orderYearRate"
                label="投资年变化率"
                align='center'
                width='120'
               >
            </el-table-column>
             <el-table-column
                prop="remarks"
                label="备注"
                align='left'
                >
                <template slot-scope="scope">
                    <span style="color:#3366CC">{{scope.row.remarks}}</span>
              </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import * as mutils from 'utils/mUtils'
    import {axios} from 'utils/'

    export default {
        data(){
            return {
                tableData: [],
                tableHeight:this.$store.state.page.win_content.height-128,   
                idFlag:false,
                fields: {}
            }
        },
      	mounted() {
            this.getList({
                fun: () => {}
            });
	   },
        methods: {
            /**
            * 格式化投资人数
            */
            formatterOrderPersonConunt(item) {
                return item.orderPersonConunt+'人';
            },
            getList({
                page,
                page_size,
                where,
                fun
            } = {}){
                axios({
                    type:'get',
                    path:'/api/money/getChinaTouziList',
                    data:'',
                    fn:data=>{
                        this.tableData = [];
                    	data.data.forEach(item => {
                    	  	const tableItem = {
                                id:  item._id,
                                provinces:item.provinces,
                                orderMoney:mutils.toFixedNum(item.orderMoney),
                                incomeMoney:mutils.toFixedNum(item.incomeMoney),
                                payType:item.payType,
                                orderPeriod:item.orderPeriod,
                                orderYearRate:item.orderYearRate,
                                orderPersonConunt:item.orderPersonConunt,
                                orderPersonAge:item.orderPersonAge,
                                remarks:item.remarks
                    		}
                    		this.tableData.push(tableItem);
                        })
                        fun && fun();
                    }
                })
           },
            exportToExcel() {
                require.ensure([], () => {
                    const {
                        export_json_to_excel
                    } = require('vendor/Export2Excel');
                    
                    const tHeader = ['序号','省份', '投资总额', '收益总额', '主要投资项目','投资周期', '投资人数', '投资年变化率','备注'];
                    const filterVal = ['id','provinces', 'orderMoney', 'incomeMoney', 'payType','orderPeriod', 'orderPersonConunt', 'orderYearRate', 'remarks'];
                    const list = this.tableData;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '列表excel');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
           
        }
    }
</script>

<style lang="less" scoped>
     .excel_container{
        height: 36px;
        line-height: 36px;
        margin-bottom:10px;
    }
</style>


