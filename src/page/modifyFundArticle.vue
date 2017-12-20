<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-table
                :data="tableData"
                 class="modifyFundArticlesTable"
                 border
                 style="width:100%"
                 align='center'
                 :max-height="tableHeight">
                <el-table-column
                    prop="sortnum"
                    label="序号"
                    align='center'
                    width="70">
                </el-table-column>
                <el-table-column
                    v-if="idFlag"
                    prop="id"
                    label="id"
                    align='center'
                    width="220">
                </el-table-column>
                  <el-table-column
                    v-if="idFlag"
                    prop="content"
                    label="content"
                    align='center'
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="文章标题"
                    header-align='center'
                    align='left'
                    width="260">
                     <template slot-scope="scope">
                         <span class="title" @click="showFundArticle(scope.row)">{{scope.row.title}}</span>
                     </template>  
                </el-table-column>
                <el-table-column
                    prop="publishDate"
                    label="发布时间"
                    align='center'
                    width="180"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者"
                    align='center'
                    width="80"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="category"
                    label="类目"
                    align='center'
                    width="80"
                    sortable>
                </el-table-column>
              <!--  <el-table-column
                    prop="comeFrom"
                    label="来源"
                    align='center'
                    width="95"
                    sortable>
                </el-table-column>  -->
                <el-table-column
                    prop="important"
                    label="重要性"
                    align='center'
                    width="165"
                    sortable>
                     <template slot-scope="scope">
                        <el-rate
                            class="irate"
                            v-model="rate_value"
                            :max='parseInt(scope.row.important)'
                            disabled>
                        </el-rate>
                    </template>  
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    align='center'
                    width='92'
                    :filters="fields.articleStatus.filter.list"
                    :filter-method="filterStatus"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                            :type="articleStatusTag(scope.row.status)"
                            close-transition>
                            {{scope.row.status == "1" ? "已发布":((scope.row.status == "2") ? "待发布":"已删除")}}
                        </el-tag>
                    </template>  
                </el-table-column>
                <el-table-column
                prop="operation"
                align='center'
                label="操作"
                width="">
                <template slot-scope='scope'>
                    <el-button v-if="scope.row.status!='1'" size="small" type="success" @click="handleModifyStatus(scope.row,'1')">发布
                    </el-button>
                    <el-button v-if="scope.row.status!='2'" size="small" @click="handleModifyStatus(scope.row,'2')">草稿
                    </el-button>
                    <el-button v-if="scope.row.status!='3'" size="small" type="danger" @click="handleModifyStatus(scope.row,'3')">删除
                    </el-button>
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
                tableHeight:this.$store.state.page.win_content.height-90,   
                idFlag:false,
                rate_value:null,
                batch_id:'', // 以","隔开的方式来保存选中的批量id
                batch_flag: true, //符合批量删除为true,否则为false
                sortnum:0,
                format_type_list: {
                    1: '已发布',
                    2: '待发布',
                    3: '已删除'
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
                    articleStatus:{
                        filter: {
                            list: [{
                                text: '已发布',
                                value: 1
                            },{
                                text: '待发布',
                                value: 2
                            }, {
                                text: '已删除',
                                value: 3
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
            filterStatus(value, item) {
                const type = parseInt(item.status);
                return this.format_type_list[value] == this.format_type_list[type];
            },
            articleStatusTag(item){
                let basic = "";
                switch (item) {
                  case '1':
                         basic = 'success';
                         break;
                  case '2':
                         basic = 'warning';
                         break;
                  case '3':
                         basic = 'danger';
                         break;
                }
                return basic;
            },
            handleModifyStatus(row, status) {
                this.$message({
                message: '操作成功',
                type: 'success'
                });
                row.status = status;
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
                axios({
                    type:'get',
                    path:'/api/article/getFundArticles',
                    data:data,
                    fn:data=>{
                        //成功之后的回调函数
                        console.log(data);
                        this.paginations.total = data.count;
                        this.tableData = [];
                       
                    	data.data.forEach( (item,index) => {
                    	  	const tableItem = {
                                id:  item._id,
                                sortnum:this.sortnum+(index+1),
                                title:item.title,
                                abstracts:item.abstracts,
                                author:item.author,
                                category:item.category,
                                comeFrom:item.comeFrom,
                                important:item.important,
                                status:item.status,
                                publishDate:dtime(item.publishDate).format('YYYY-MM-DD HH:mm:ss'),
                                content:item.content
                    		}
                    		this.tableData.push(tableItem);
                        })
                        fun && fun();
                    }
                })
           },
           showFundArticle(row){
               console.log(row);
                //实现菜单跳转，重定向
               this.$router.push({path: '/showFundArticle',query:{'row':row}});
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
            // 每页多少条切换
            handleSizeChange(page_size) {
               console.log(`每页 ${page_size} 条`);
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
    .modifyFundArticlesTable .title{
        color:#3399cc;
        cursor:pointer;
    }
   .modifyFundArticlesTable{
        .el-table td, .el-table th{
            padding:6px 0;
        }
    }
   

     
</style>


