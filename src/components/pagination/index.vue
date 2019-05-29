<template>
    <div class="pagination">
        <el-pagination
            v-if='pageTotal > 0'
            background
            :page-sizes="paginations.pageSizes"
            :page-size="paginations.pageSize"
            :layout="paginations.layout"
            :total="pageTotal"
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
                pageSize: 20,   // 1页显示多少条
                pageSizes: [5, 10, 15, 20],  //每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
            },
          }
      },
      props:{
          pageTotal:Number
      },
      created(){

      },
      mounted(){

      },
      methods:{ 
           // 上下分页 pageIndex
          handleCurrentChange(page){
              this.$emit('handleCurrentChange',page);
          },
           // 每页多少条切换 pageSize
          handleSizeChange(page_size){
              this.$emit('handleSizeChange',page_size);
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
