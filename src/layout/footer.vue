<template>
	 <div class='footer'>
	      <div class="recordArea">
              鄂ICP备18001612号
          </div>
    </div>
</template>


<script>
export default {
    name: "footer",
	data(){
		return {
			
		}
	},
	methods:{

	}
}
</script>

<style lang="less">
	.footer{
       width:100%;
       position: fixed;
       bottom: 0;
       right: 0;
       .recordArea{
            width:100%;
            padding: 5px 0;
            box-sizing: border-box;
            color:#fff;
            background: #324057;
            font-size:12px;
            text-align: center;
       }
    }
</style>


