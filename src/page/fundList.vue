<template>
    <div class="fillcontain">
        <div class="search_container">
            <el-form 
                :inline="true" 
                :model='search_data' 
                ref="search_data" 
                class="demo-form-inline search-form">
                <el-form-item label="投标时间筛选:">
                    <el-date-picker
                        v-model="search_data.startTime"
                        type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                        v-model="search_data.endTime"
                        type="datetime"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size ="small" icon="search" @click='onScreeoutMoney("search_data")'>筛选</el-button>
                </el-form-item>

                <el-form-item class="btnRight">
                    <el-button type="primary" size ="small" icon="view" @click='onAddMoney()'>添加</el-button>
                </el-form-item>

            </el-form>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                align='center'
                :max-height="tableHeight">
            <el-table-column
                prop="sortnum"
                label="序号"
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
                prop="createTime"
                label="创建时间"
                align='center'
                width="220"
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
                width="180"
                :formatter="formatterType"
                :filters="fields.incomePayType.filter.list"
                :filter-method="filterType">
            </el-table-column>
            <el-table-column
                prop="incomePayDes"
                label="收支描述"
                align='center'
                width="240">
            </el-table-column>
            <el-table-column
                prop="income"
                label="收入"
                align='center'
                width="170"
                sortable> 
                <template slot-scope="scope">  
                    <span style="color:#00d053">+ {{ scope.row.income }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="pay"
                label="支出"
                align='center'
                width="170"
                sortable>
                <template slot-scope="scope">  
                    <span style="color:#f56767">- {{ scope.row.pay }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="accoutCash"
                label="账户现金"
                align='center'
                width="170"
                sortable>
                <template slot-scope="scope">  
                    <span style="color:#4db3ff">{{ scope.row.accoutCash }}</span>
                </template>
            </el-table-column>
                <el-table-column
                prop="remarks"
                label="备注"
                align='center'
                width="250">
            </el-table-column>
            <el-table-column
                prop="operation"
                align='center'
                label="操作"
                fixed="right"
                width="180">
                <template slot-scope='scope'>
                    <el-button 
                        type="warning" 
                        icon='edit' 
                        size="small"
                        @click='onEditMoney(scope.row)'
                    >编辑</el-button>
                    <el-button 
                        type="danger" 
                        icon='delete' 
                        size="small"
                        @click='onDeleteMoney(scope.row,scope.$index)'
                    >删除</el-button>
                </template>
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
        <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    :label-width="dialog.formLabelWidth" 
                    style="margin:10px;width:auto;">

                    <el-form-item label="收支类型:" >
                        <el-select v-model="form.incomePayType" placeholder="收支类型">
                            <el-option label="提现" value="0"></el-option>
                            <el-option label="提现手续费" value="1"></el-option>
                            <el-option label="提现锁定" value="2"></el-option>
                            <el-option label="理财服务退出" value="3"></el-option>
                            <el-option label="购买宜定盈" value="4"></el-option>
                            <el-option label="充值" value="5"></el-option>
                            <el-option label="优惠券" value="6"></el-option>
                            <el-option label="充值礼券" value="7"></el-option>
                            <el-option label="转账" value="8"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop='incomePayDes' label="收支描述:">
                        <el-input type="textarea" v-model="form.incomePayDes"></el-input>
                    </el-form-item>

                    <el-form-item prop='income'  label="收入:">
                        <el-input type="income" v-model.number="form.income"></el-input>
                    </el-form-item>

                    <el-form-item prop='pay' label="支出:">
                        <el-input type="pay" v-model.number="form.pay"></el-input>
                    </el-form-item>

                    <el-form-item prop='accoutCash' label="账户现金:">
                        <el-input type="accoutCash" v-model.number="form.accoutCash"></el-input>
                    </el-form-item>

                     <el-form-item label="备注:">
                        <el-input type="textarea" v-model="form.remarks"></el-input>
                    </el-form-item>

                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
      
    </div>
</template>

<script>
    import dtime from 'time-formater'
    import * as mutils from 'utils/mUtils'
    import {axios} from 'utils/'

    export default {
        data(){
             let validateData = (rule, value, callback) => {
                if(value === ''){
                    let text;
                    if(rule.field == "income"){
                        text='收入';
                    }else if(rule.field == "pay"){
                        text='支出';
                    }else{
                        text='账户现金';
                    }
                    callback(new Error(text+'不能为空~'));
                }else{
                   let numReg = /^[0-9]+.?[0-9]*$/;
                   if(!numReg.test(value)){
                      callback(new Error('请输入数字值'));
                   }else{
                      callback();
                   }
                }
            };
            return {
                tableData: [],
                tableHeight:'',
                idFlag:false,
                editid:'',
                sortnum:0,
                search_data:{
                    startTime:'',
                    endTime:''
                },
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
                //需要给分页组件传的信息
                paginations: {
                    page_index: 1,  // 当前位于哪页
                    total: 0,        // 总数
                    page_size: 20,   // 1页显示多少条
                    page_sizes: [5, 10, 15, 20],  //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
                },
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
                        style: {
                            width: '260',
                            align: 'center'
                        }
                    },
                },
                //详情弹框信息
                dialog: {
                    width:'400px',
                    show : false,
                    title: '修改资金信息',
                    formLabelWidth:'120px'
                },
                form:{
                    incomePayType:'',
                    incomePayDes: '',
                    income: '',
                    pay:'',
                    accoutCash:'',
                    remarks: ''
                },
                form_rules: {
                     incomePayDes   : [
                        {required: true, message : '收支描述不能为空！',trigger : 'blur'}
                     ],
                     income   : [
                        { required: true, validator:validateData,trigger: 'blur'},
                     ],
                     pay   : [
                        { required: true, validator:validateData,trigger: 'blur'},
                     ],
                     accoutCash   : [
                          { required: true, validator:validateData,trigger: 'blur'},
                    ],
			   }

            }
        },
      	mounted() {
            //加载数据之前，先加载theme颜色
            this.getList({
                fun: () => {}
            });
	   },
        methods: {
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
                axios({
                    type:'get',
                    path:'/api/money/getMoneyIncomePay',
                    data:data,
                    fn:data=>{
                        //成功之后的回调函数
                        this.paginations.total = data.count;
                        this.tableData = [];
                    	data.data.forEach((item,index) => {
                    	  	const tableItem = {
                                sortnum:this.sortnum+(index+1),
                                id:  item._id,
                    			createTime: mutils.parseToDate(JSON.stringify(item.createTime)),
						        incomePayType: item.incomePayType,
						        incomePayDes: item.incomePayDes,
                                income: mutils.toFixedNum(item.income),
                                pay:  mutils.toFixedNum(item.pay),
                                accoutCash:  mutils.toFixedNum(item.accoutCash),
                                remarks: item.remarks
                    		}
                    		this.tableData.push(tableItem);
                        })
                        fun && fun();
                    }
                })
           },
            // 操作方法
            onEditMoney(row){
                this.editid = row.id;
                this.form.incomePayType = row.incomePayType;
                this.form.incomePayDes = row.incomePayDes;
                this.form.income = Number(row.income);
                this.form.pay = Number(row.pay);
                this.form.accoutCash = Number(row.accoutCash);
                this.form.remarks = row.remarks;
               
                this.dialog.title = '修改资金信息';
                this.dialog.show  = true;
            },
            onDeleteMoney(row){
                //根据id来删除数据
                this.$message({
                    showClose: true,
                    message: '对不起，您暂无此操作权限~',
                    type: 'success'
                });
                return;
                let data = {
                    id:row.id
                }
                axios({
                    type:'get',
                    path:'/api/money/deleteMoneyIncomePay',
                    data:data,
                    fn:data=>{
                        this.$message('删除成功'),
                        this.paginations.total = data.count;
                        this.getList({fun: () => {} });     // 删除成功后，重新加载数据;
                    },
                    errFn:()=>{
                        this.$message.error('删除失败请重试')
                    }
                })
            },
            onAddMoney(){
                const formdata = this.form;
                for(let key in formdata){
                    formdata[key] ='';
                }
                this.dialog.title = '新增资金信息';
                this.dialog.show  = true;
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
               this.sortnum = this.paginations.page_size*(page-1);
               this.getList({
                    page,
                    fun: () => {
                        this.setPath('page', page);
                    }
                });
            },
            editMoneyIncomePay(data){
                axios({
                    type:'get',
                    path:'/api/money/editMoneyIncomePay',
                    data:data,
                    fn:data=>{
                        this.$message('编辑成功'),
                        this.paginations.total = data.count;
                        this.getList({fun: () => {} }); 
                        this.dialog.show = false;
                    },
                    errFn:()=>{
                        this.$message.error('编辑失败请重试')
                    }
                })
            },
            addMoneyIncomePay(data){
                axios({
                    type:'get',
                    path:'/api/money/addMoneyIncomePay',
                    data:data,
                    fn:data=>{
                        this.$message('新增成功'),
                        this.paginations.total = data.count;
                        this.getList({fun: () => {} }); 
                        this.dialog.show = false;
                    },
                    errFn:()=>{
                        this.$message.error('新增失败请重试')
                    }
                })
            },
            //表单提交
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {//表单数据验证完成之后，提交数据;
                        let formData = this[form];
                        let data = {};
                    
                        for(var i in formData){
                            data.id = this.editid;
                            data.accoutCash = Number(formData['accoutCash'])
                            data.income = Number(formData['income'])
                            data.pay = Number(formData['pay'])
                            data.incomePayType = parseInt(formData['incomePayType'])
                            data.incomePayDes = formData['incomePayDes']
                            data.remarks = formData['remarks']
                        }
                        console.log(data);
                        if(this.editid != ""){
                            this.editMoneyIncomePay(data)
                        }else{
                            this.addMoneyIncomePay(data)
                        }
                       
                    }
                })
            },
            //筛选
            onScreeoutMoney(search_data){
                this.$refs[search_data].validate((valid) => {
                    if (valid) {//表单数据验证完成之后，提交数据;
                        let formData = this[search_data];
                        let data = {};
                        const startTime = formData['startTime'];
                        const endTime = formData['endTime'];
                          
                        if(mutils.isEmpty(startTime)){
                            data.startTime = "";
                        }else{
                            data.startTime =  parseInt(mutils.formatDate(new Date(startTime),2)); // 毫秒数，时间戳
                        }
                        if(mutils.isEmpty(endTime)){
                            data.endTime = "";
                        }else{
                            data.endTime =  parseInt(mutils.formatDate(new Date(endTime),2));
                        }
                        console.log(data);
                        axios({
                            type:'get',
                            path:'/api/money/screeoutMoneyIncomePay',
                            data:data,
                            fn:data=>{
                                //得到筛选之后的值，进行重新加载表格数据;
                                this.$message('筛选成功'),
                                this.paginations.total = data.count;  // ??
                                this.tableData = [];
                                data.data.forEach( (item,index) => {
                                    const tableItem = {
                                        id:  item._id,
                                        sortnum:this.sortnum+(index+1),
                                        createTime: mutils.parseToDate(JSON.stringify(item.createTime)),
                                        incomePayType: item.incomePayType,
                                        incomePayDes: item.incomePayDes,
                                        income: item.income,
                                        pay:  item.pay,
                                        accoutCash:  item.accoutCash,
                                        remarks: item.remarks
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
              
              
            }

        },
    }
</script>

<style lang="less" scoped>
     .btnRight{
        float: right;
        margin-right: 0px !important;
    }
    .search-form{
        width:100%;
        min-width:750px;
        .el-form-item{
            margin-bottom: 10px !important;
             .el-date-editor{
                width:200px;
                .el-input__inner{
                    height:36px !important;
                }
            }
        }
    }

    .el-dialog--small{
       width: 600px !important;
    }
    .pagination{
        text-align: left;
        margin-top: 10px;
    }
     
</style>


