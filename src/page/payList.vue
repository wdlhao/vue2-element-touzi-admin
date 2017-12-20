<template>
    <div class="fillcontain">
        <div class="search_container">
            <el-form 
                :inline="true" 
                :model='search_data' 
                :rules="search_form_rules"
                 ref="search_data"  
                class="demo-form-inline search-form">
                 <el-form-item prop='payNumber' label="支付单号:">
                    <el-input type="text" v-model="search_data.payNumber" placeholder="请输入支付单号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click='onScreeoutMoney("search_data")'>筛选</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger"  icon='delete' :disabled='batch_flag'  @click='onDeletePayList()'>删除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                v-loading="loading"
                style="width: 100%"
                align='center'
                :max-height="tableHeight"
                @selection-change='onSelectionChange'>
            <el-table-column
                type="selection"
                align='center'
                width="80">
            </el-table-column>
              <el-table-column
                v-if="idFlag"
                prop="id"
                label="id"
                align='center'
                width="220">
            </el-table-column>
             <el-table-column
                prop="payNumber"
                label="支付单号"
                align='center'
                width="160">
            </el-table-column>
            <el-table-column
                prop="orderMoney"
                label="订单金额"
                align='center'
                width="120"
                sortable>
                <template slot-scope="scope">  
                    <span style="color:#0066cc">{{ scope.row.orderMoney }}</span>
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
                label="支付项目"
                align='center'
                width="120"
                :filters="fields.payType.filter.list"
                :filter-method="filterType">
                <template slot-scope="scope">
                    <el-tag
                        :type="payTypeTag(scope.row.payType)"
                        close-transition>
                        {{scope.row.payType}}
                    </el-tag>
              </template>
            </el-table-column>
             <el-table-column
                prop="orderTime"
                label="下单时间"
                align='center'
                width="210"
                sortable>
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px;color:#66ccff">{{ scope.row.orderTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="payStatus"
                label="支付状态"
                align='center'
                width='120'
                :filters="fields.payStatus.filter.list"
                :filter-method="filterStatus"
                filter-placement="bottom-end">
                 <template slot-scope="scope">
                    <el-tag
                         :type="payStatusTag(scope.row.payStatus)"
                         close-transition>
                         {{scope.row.payStatus == "0" ? "支付成功":((scope.row.payStatus == "1") ? "待支付":"支付失败")}}
                    </el-tag>
               </template> 
            </el-table-column>
             <el-table-column
                prop="remarks"
                label="备注"
                align='center'
                >
            </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                            <el-pagination
                            v-if='paginations.total > 0'
                            :page-sizes="paginations.page_sizes"
                            :page-size="paginations.page_size"
                            :layout="paginations.layout"
                            :total="paginations.total"
                            :current-page='paginations.page_index'
                            @current-change='handleCurrentChange'
                            @size-change='handleSizeChange'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import dtime from 'time-formater'
    import * as mutils from 'utils/mUtils'
    import {axios} from 'utils/'

    export default {
        data(){
            return {
                tableData: [],
                tableHeight:this.$store.state.page.win_content.height-128,   
                idFlag:false,
                batch_id:'', // 以","隔开的方式来保存选中的批量id
                batch_flag: true, //符合批量删除为true,否则为false
                loading:true,
                search_data:{
                    payNumber:'',
                },
                format_type_list: {
                    0: '支付成功',
                    1: '待支付',
                    2: '支付失败'
                },
                //需要给分页组件传的信息
                paginations: {
                    page_index: 1,  // 当前位于哪页
                    total: 0,        // 总数
                    page_size: 20,   // 1页显示多少条
                    page_sizes: [5, 10, 15, 20],  //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
                },
                fields: {
                    payStatus:{
                        filter: {
                            list: [{
                                text: '支付成功',
                                value: 0
                            },{
                                text: '待支付',
                                value: 1
                            }, {
                                text: '支付失败',
                                value: 2
                            }],
                            multiple: true
                        }
                    },
                    payType:{
                        filter: {
                            list: [{
                                text: '债券',
                                value: '债券'
                            },{
                                text: '股票',
                                value: '股票'
                            }, {
                                text: '借款',
                                value: '借款'
                            }, {
                                text: '保险',
                                value: '保险'
                            }, {
                                text: '投标',
                                value: '投标'
                            }],
                            multiple: true
                        }
                   }
                },
                search_form_rules: {
                    payNumber   : [{
                        required: false,
                        message : '支付单号不能为空！',
                        trigger : 'blur'
                    }]
                }

            }
        },
      	mounted() {
            this.getList({
                fun: () => {}
            });
	   },
        methods: {
            filterType(value,item) {
                return item.payType = value
            },
            filterStatus(value, item) {
                const type = parseInt(item.payStatus);
                return this.format_type_list[value] == this.format_type_list[type];
            },
            payTypeTag(item){
                let basic = "";
                switch (item) {
                  case '债券':
                         basic = 'info';
                         break;
                  case '股票':
                         basic = 'danger';
                         break;
                  case '借款':
                         basic = 'warning';
                         break;
                  case '保险':
                         basic = 'success';
                         break;
                  case '投标':
                         basic = 'primary';
                         break;
                }
                return basic;
            },
            payStatusTag(item){
                let basic = "";
                switch (item) {
                  case '0':
                         basic = 'success';
                         this.tagvalue = '支付成功';
                         break;
                  case '1':
                         basic = 'warning';
                         this.tagvalue = '待成功';
                         break;
                  case '2':
                         basic = 'danger';
                         this.tagvalue = '支付失败';
                         break;
                }
                return basic;
            },
            /**
            * 表格列表触发CheckBox的事件
            * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
            */
            onSelectionChange(val) {
                if (val.length) {
                    this.batch_flag = false;
                    const ids = [];
                    for (var i = 0; i < val.length; i++) {
                        ids.push(val[i].id);
                    }
                    this.batch_id = ids;
                } else {
                    this.batch_flag = true;
                    this.batch_id   = '';
                }
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
            getList({
                page,
                page_size,
                where,
                fun
            } = {}){
                var query = this.$route.query;
                this.paginations.page_index = page || parseInt(query.page) || 1;
                this.paginations.page_size  = page_size || parseInt(query.page_size) || this.paginations.page_size;
                var data = {
                    pageIndex: this.paginations.page_index,
                    pageSize: this.paginations.page_size
                };
                if (where) {
				   data = Object.assign(data, where || {});
                } 
                // 封装  get,path,params,fn,errfn
                console.log(data);
                axios({
                    type:'get',
                    path:'/api/money/getPayList',
                    data:data,
                    fn:data=>{
                        //成功之后的回调函数
                        this.paginations.total = data.count;
                        this.tableData = [];
                    	data.data.forEach(item => {
                    	  	const tableItem = {
                                id:  item._id,
                                payNumber:item.payNumber,
                                orderMoney:mutils.toFixedNum(item.orderMoney),
                                incomeMoney:mutils.toFixedNum(item.incomeMoney),
                                payType:item.payType,
                                orderTime:dtime(item.orderTime).format('YYYY-MM-DD HH:mm:ss'),
                                payStatus:item.payStatus,
                                remarks:item.remarks
                    		}
                    		this.tableData.push(tableItem);
                        })
                        this.loading = false;
                        fun && fun();
                    }
                })
           },
            // 每页多少条切换
            handleSizeChange(page_size) {
               this.getList({
                    page_size,
                    fun: () => {
                        this.setPath('page_size', page_size);
                    }
			   });
            },
            // 上下分页
            handleCurrentChange(page) {
               this.getList({
                    page,
                    fun: () => {
                        this.setPath('page', page);
                    }
                });
            },
            //订单筛选
            onScreeoutMoney(search_data){
                this.$refs[search_data].validate((valid) => {
                    if (valid) { //表单数据验证完成之后，提交数据;
                        let formData = this[search_data];
                        axios({
                            type:'get',
                            path:'/api/money/screeoutPayList',
                            data:formData,
                            fn:data=>{
                                this.$message({message:'筛选成功',type: 'success'}),
                                this.loading = false;
                                this.paginations.total = data.count;
                                this.tableData = [];
                                data.data.forEach(item => {
                                    const tableItem = {
                                        id:  item._id,
                                        payNumber:item.payNumber,
                                        orderMoney:mutils.toFixedNum(item.orderMoney),
                                        incomeMoney:mutils.toFixedNum(item.incomeMoney),
                                        payType:item.payType,
                                        orderTime:dtime(item.orderTime).format('YYYY-MM-DD HH:mm:ss'),
                                        payStatus:item.payStatus,
                                        remarks:item.remarks
                                    }
                                    this.tableData.push(tableItem);
                                })
                            },
                            errFn:()=>{
                                this.$message.error('编辑失败请重试')
                            }
                        })
                    }
                })
            },
            onDeletePayList(){
                this.$message({
                    showClose: true,
                    message: '对不起，您暂无此操作权限~',
                    type: 'success'
                });
                return;
                let ids = this.batch_id;
                let reqData = {
                    'ids':ids
                }
                axios({
                    type:'get',
                    path:'/api/money/batchDeletePayList',
                    data:reqData,
                    fn:data=>{
                        //得到筛选之后的值，进行重新加载表格数据;
                        this.$message({message:'删除成功',type: 'success'}),
                        this.paginations.total = data.count;
                        this.getList({fun: () => {} }); // 删除成功后，重新加载数据;                
                    },
                    errFn:()=>{
                        this.$message.error('删除失败请重试')
                    }
                })
            }        
        }
    }
</script>

<style lang="less" scoped>
     .search_container{
        height: 36px;
        line-height: 36px;
        margin-bottom:10px;
    }
    .search-form{
        width:100%;
        min-width:750px;
    }
    .pagination{
        text-align: left;
        margin-top: 10px;
    }
</style>


