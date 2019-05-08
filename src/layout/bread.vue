<template>
	 <div class='bread_container' id="bread_container">
	    <span @click="handleLefeMenu" class="bars"> 
		    <i class="fa fa-bars"  :class="{isactive:changeBarDirection}"></i>
		</span>
        <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item 
                v-for='(item,index) in $route.matched'
                :key='index'
				v-if='item.meta.title'>
				{{item.meta.title}}
			</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>


<script>

export default {
	data(){
		return {
			changeBarDirection:false,
		}
	},
	created() {
		
    },
	methods:{
		setSize() {
			const win_size = {
				width:(this.$store.state.menu.sidebar.opened)? this.$$lib_$(window).width()-180:this.$$lib_$(window).width()-35,
				height:this.$$lib_$(window).height()-73
			}
			//将content部分的宽高，存入store中，
			this.$store.dispatch('set_win_content',win_size);
		},
		handleLefeMenu(){
		    this.$store.dispatch('setLeftCollapse');  // 折叠菜单
			this.$store.dispatch('handleLeftMenu');  // 改变菜单宽度
			this.$store.dispatch('dropName');   // 隐藏单一菜单名称
			this.setSize()
			this.changeBarDirection = !this.changeBarDirection;
		}
	},
	watch: {
     
    }
}



</script>

<style lang="less">
	.bread_container{
		background-color: #EFF2F7;
		margin-bottom: 5px;
		width: 100%;
		.bars{
			float: left;
            margin: 4px 10px;
			cursor: pointer;
			.isactive{
				-webkit-transform: rotate(90deg);
				transform: rotate(90deg);
				transition: .38s;
				-webkit-transform-origin: 50% 50%;
				transform-origin: 50% 50%;
			}
		}
		.breadcrumb{
			height: 30px;
			line-height: 30px;
			.breadbutton{
				float:left;
				margin:4px 5px 0 0;
				
			}
		}
	}
</style>


