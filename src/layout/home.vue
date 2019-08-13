<template>
    <div class="home rflex">
        <left-menu></left-menu>
        <div class="menu_right cflex wflex" :style="{left:sidebar.width}">
            <head-nav></head-nav>
            <div class="menu_content" ref="menu_content">
                <bread></bread>
                <router-view></router-view><!--页面渲染入口-->
            </div>
            <footerNav></footerNav>
        </div>
    </div>
</template>
<script>
    import { mapState, mapGetters } from 'vuex'

    import HeadNav from './headNav.vue';
	import LeftMenu from './leftMenu.vue';
	import Bread from './bread.vue';
	import FooterNav from './footerNav.vue';

    export default {
        name: 'home',
        data(){
            return {
            }
        },
        computed:{
            ...mapGetters(['sidebar'])
        },
        components:{
            HeadNav,
            LeftMenu,
            Bread,
            FooterNav
        },
        created() {

        },
        mounted (){
        },
         methods: {
          
        },
    }
</script>
<style scoped lang='less'>
    .home{
        .menu_right{
            overflow: auto;
            position: absolute;
            right:0;
            top:0;
            bottom:0;
            background:#F6F7FC;
            .menu_content{
                position: relative;
                margin-top:60px;
                width:100%;
                background:#f0f2f5;
            }

        }
    }
</style>
