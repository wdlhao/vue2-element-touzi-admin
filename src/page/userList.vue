<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-table
                 :data="tableData"
                 border
                 highlight-current-row
                 style="width:100%">
                <el-table-column
                   prop="sortnum"
                   label="#"
                   width="60"
                   align='center'>
                </el-table-column>
                 <el-table-column
                   property="username"
                   label="用户姓名"
                   width="120"
                   align='center'>
                </el-table-column>
                <el-table-column
                   property="address"
                   label="注册地址"
                   width="160"
                   align='center'>
                </el-table-column>
                <el-table-column
                   property="area"
                   label="注册区域"
                   width="120"
                   align='center'>
                </el-table-column>
                  <el-table-column
                   property="isp"
                   label="网络"
                   width="80"
                   align='center'>
                </el-table-column> 
                 <el-table-column
                   property="ip"
                   label="IP地址"
                   width="180"
                   align='center'>
                </el-table-column>
                <el-table-column
                   property="createTime"
                   label="注册时间"
                   width="180"
                   align='center'>
                </el-table-column>
                <el-table-column
                   property="updateTime"
                   label="登录时间"
                   width="180"
                   align='center'>
                </el-table-column>
                 <el-table-column
                   property="region_id"
                   label="地区编号"
                   width="120"
                   align='center'>
                </el-table-column> 
                 <el-table-column
                   property="city_id"
                   label="城市编号"
                   align='center'>
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
    import * as mutils from 'utils/mUtils'
    import {axios} from 'utils/'

    export default {
        data(){
            return {
                sortnum:0,
                tableData: [],
              //需要给分页组件传的信息
                paginations: {
                    page_index: 1,  // 当前位于哪页
                    total: 0,        // 总数
                    page_size: 20,   // 1页显示多少条
                    page_sizes: [5, 10, 15, 20],  //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
                },
            }
        },
    	components: {

    	},
        created(){
            
        },
        mounted(){
            this.getList({
                fun: () => {}
            });
        },
        methods: {
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
                    path:'/api/user/getUserInfo',
                    data:data,
                    fn:data=>{
                        console.log(data);
                        //成功之后的回调函数
                        this.paginations.total = data.count;
                        this.tableData = [];
                    	data.data.forEach( (item,index) => {
                    	  	const tableItem = {
                                id:  item._id,
                                sortnum:this.sortnum+(index+1),
                                username:item.username,
                                address:item.address,
                                createTime: mutils.parseToDate(JSON.stringify(item.createTime)),
                                updateTime: mutils.parseToDate(JSON.stringify(item.updateTime)),
                                ip:item.ip,
                                area:item.area,
                                region_id:item.region_id,  //地区编号
                                city_id:item.city_id, //城市编号
                                isp:item.isp, // 网络
                    		}
                    		this.tableData.push(tableItem);
                        })
                        fun && fun();
                    }
                })
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
           
        },
    }
</script>


