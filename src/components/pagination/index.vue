<template>
    <div class="pagination">
        <el-pagination
            v-if='paginations.total > 0'
            :page-sizes="paginations.pageSizes"
            :page-size="paginations.pageSize"
            :layout="paginations.layout"
            :total="paginations.total"
            :current-page='paginations.pageIndex'
            @current-change='handleCurrentChange'
            @size-change='handleSizeChange'>
        </el-pagination>
    </div>
</template>


<script>
  export default {
      name:'pagination',
      data(){
          return {
            paginations: {
                pageIndex: 1,  // 当前位于哪页
                total: 0,        // 总数
                pageSize: 20,   // 1页显示多少条
                pageSizes: [5, 10, 15, 20],  //每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
            },
          }
      },
      props:{
          paginaTotal:Number
      },
      created(){
          this.paginations.total = this.paginaTotal;
      },
      mounted(){

      },
      methods:{
          handleCurrentChange(){

          },
          handleSizeChange(){

          }
      }
  }
</script>

<style lang="less" scoped>
    .pagination{
        text-align: right;
        padding: 10px 18px;
    }
</style>
