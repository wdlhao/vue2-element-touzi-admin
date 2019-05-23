<template>
    <div class="fillcontain">
        <search-item @showDialog="showAddFundDialog"></search-item>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                align='center'
                :height="tableHeight"
                >
              <el-table-column
                v-if="idFlag"
                prop="id"
                label="id"
                align='center'
                width="220">
            </el-table-column>
            <el-table-column
                type="selection"
                align='center'
                width="40">
            </el-table-column>
              <el-table-column
                prop="username"
                label="用户姓名"
                align='center'
                width="160">
            </el-table-column>
            <el-table-column
                prop="address"
                label="籍贯"
                align='center'
                width="160">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="投资时间"
                align='center'
                sortable>
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="incomePayType"
                label="收支类型"
                align='center'
                width="130"
                :formatter="formatterType"
                :filters="fields.incomePayType.filter.list"
                :filter-method="filterType">
            </el-table-column>
            <el-table-column
                prop="income"
                label="收入"
                align='center'
                width="130"
                sortable> 
                <template slot-scope="scope">  
                    <span style="color:#00d053">+ {{ scope.row.income }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="pay"
                label="支出"
                align='center'
                width="130"
                sortable>
                <template slot-scope="scope">  
                    <span style="color:#f56767">{{ scope.row.pay }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="accoutCash"
                label="账户现金"
                align='center'
                width="130"
                sortable>
                <template slot-scope="scope">  
                    <span style="color:#4db3ff">{{ scope.row.accoutCash }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                align='center'
                label="操作"
                width="180">
                <template slot-scope='scope'>
                    <el-button 
                        type="warning" 
                        icon='edit' 
                        size="mini"
                        @click='onEditMoney(scope.row)'
                    >编辑</el-button>
                    <el-button 
                        type="danger" 
                        icon='delete' 
                        size="mini"
                        @click='onDeleteMoney(scope.row,scope.$index)'
                    >删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addFundDialog  v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"  @getFundList="getMoneyList"  @closeDialog="hideAddFundDialog"></addFundDialog>
        </div>
    </div>
</template>

<script>
    import dtime from 'time-formater'
    import * as mutils from 'utils/mUtils'
    import {axios} from 'utils/'
    import SearchItem from "./components/searchItem";
    import AddFundDialog from "./components/addFundDialog";
    import Pagination from "@/components/pagination";
    import { getMoneyIncomePay , removeMoney } from "@/api/money";

    export default {
        data(){
            return {
                tableData: [],
                tableHeight:0,
                idFlag:false,
                isShow:false, // 是否显示资金modal,默认为false
                editid:'',
                sortnum:0,
                format_type_list: {
                    0: '提现',
                    1: '提现手续费',
                    2: '提现锁定',
                    3: '理财服务退出',
                    4: '购买宜定盈',
                    5: '充值',
                    6: '优惠券',
                    7: '充值礼券',
                    8: '转账'
                },
                addFundDialog:{  
                    show:false,
                    dialogRow:{}
                },
                incomePayData:{
                    page:1,
                    limit:20,
                    name:''
                },
                pageTotal:0,
                //需要给分页组件传的信息
                fields: {
                    incomePayType:{
                        filter: {
                            list: [{
                                text: '提现',
                                value: 0
                            },{
                                text: '提现手续费',
                                value: 1
                            }, {
                                text: '提现锁定',
                                value: 2
                            }, {
                                text: '理财服务退出',
                                value: 3
                            }, {
                                text: '购买宜定盈',
                                value: 4
                            }, {
                                text: '充值',
                                value: 5
                            }, {
                                text: '优惠券',
                                value: 6
                            }, {
                                text: '充值礼券',
                                value: 7
                            }, {
                                text: '转账',
                                value: 8
                            }],
                            multiple: true
                        }
                    },
                    create_time: {
                        info: {
                            prop: 'create_time',
                            label: '日期',
                            sortable: true
                        },
                        filter: {

                        },
                        // style: {
                        //     width: '260',
                        //     align: 'center'
                        // }
                    },
                },
               
            }
        },
        components:{
            SearchItem,
            AddFundDialog,
            Pagination
        },
      	mounted() {
            this.getMoneyList();
            this.$nextTick(() => {
               this.tableHeight =  document.body.clientHeight - 300
            })
	   },
        methods: {
            getMoneyList(){
                getMoneyIncomePay(this.incomePayData).then(res => {
                    console.log(res);
                     this.pageTotal = res.data.total
                     this.tableData = res.data.moneyList
                })
            },
            // 显示资金弹框
            showAddFundDialog(val){
                this.$store.commit('SET_DIALOG_TITLE', val)
                this.addFundDialog.show = true;
            },
            hideAddFundDialog(){
                this.addFundDialog.show = false;
            },
            // 上下分页
            handleCurrentChange(val){
                this.incomePayData.page = val;
                this.getMoneyList()
            },
            // 每页显示多少条
            handleSizeChange(val){
                this.incomePayData.limit = val;
                this.getMoneyList()
            },








            /**
            * 格式化状态
            */
            formatterType(item) {
                const type = parseInt(item.incomePayType);
                return this.format_type_list[type];
            },
            filterType(value, item) {
                const type = parseInt(item.incomePayType);
                return this.format_type_list[value] == this.format_type_list[type];
            },
            /**
            * 改变页码和当前页时需要拼装的路径方法
            * @param {string} field 参数字段名
            * @param {string} value 参数字段值
            */
            setPath(field, value) {
                var path  = this.$route.path,
                    query = Object.assign({}, this.$route.query);
                if (typeof field === 'object') {
                    query = field;
                } else {
                    query[field] = value;
                }
                this.$router.push({
                    path,
                    query
                });
            },
            // 编辑操作方法
            onEditMoney(row){
                this.addFundDialog.dialogRow = row;
                this.showAddFundDialog();
            },
            // 删除数据
            onDeleteMoney(row){
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    const para = { id: row.id }
                    removeMoney(para).then(res => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getMoneyList()
                    })
                })
                .catch(() => {})
            },
           
            //筛选
            // onScreeoutMoney(search_data){
            //     this.$refs[search_data].validate((valid) => {
            //         if (valid) {//表单数据验证完成之后，提交数据;
            //             let formData = this[search_data];
            //             let data = {};
            //             const startTime = formData['startTime'];
            //             const endTime = formData['endTime'];
                          
            //             if(mutils.isEmpty(startTime)){
            //                 data.startTime = "";
            //             }else{
            //                 data.startTime =  parseInt(mutils.formatDate(new Date(startTime),2)); // 毫秒数，时间戳
            //             }
            //             if(mutils.isEmpty(endTime)){
            //                 data.endTime = "";
            //             }else{
            //                 data.endTime =  parseInt(mutils.formatDate(new Date(endTime),2));
            //             }
            //             console.log(data);
            //             axios({
            //                 type:'get',
            //                 path:'/api/money/screeoutMoneyIncomePay',
            //                 data:data,
            //                 fn:data=>{
            //                     //得到筛选之后的值，进行重新加载表格数据;
            //                     this.$message('筛选成功'),
            //                     this.paginations.total = data.count;  // ??
            //                     this.tableData = [];
            //                     data.data.forEach( (item,index) => {
            //                         const tableItem = {
            //                             id:  item._id,
            //                             sortnum:this.sortnum+(index+1),
            //                             createTime: mutils.parseToDate(JSON.stringify(item.createTime)),
            //                             incomePayType: item.incomePayType,
            //                             incomePayDes: item.incomePayDes,
            //                             income: item.income,
            //                             pay:  item.pay,
            //                             accoutCash:  item.accoutCash,
            //                             remarks: item.remarks
            //                         }
            //                         this.tableData.push(tableItem);
            //                     })
            //                 },
            //                 errFn:()=>{
            //                     this.$message.error('编辑失败请重试')
            //                 }
            //             })
            //         }
            //     })
              
              
            // }

        },
    }
</script>

<style lang="less" scoped>
    .table_container{
        // border:1px solid;
    }
    .el-dialog--small{
       width: 600px !important;
    }
    .pagination{
        text-align: left;
        margin-top: 10px;
    }
     
</style>


