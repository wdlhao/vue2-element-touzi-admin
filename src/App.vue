<template>
    <div id="app">
		   <router-view></router-view>
    </div>
</template>

<script>
    export default {
    	name:'App'
    }
</script>

<style lang="less">
    @import './style/variables';
	@import './style/element-ui';
	@import './style/common';
	@import './style/scrollBar';
</style>
