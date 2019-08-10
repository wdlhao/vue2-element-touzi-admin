<template>
    <div class="home rflex">
        <left-menu></left-menu>
        <div class="menu_right cflex wflex" :style="{left:sidebar.width}">
            <head-nav></head-nav>
            <div class="menu_content">
                <bread></bread>
                <router-view></router-view><!--页面渲染入口-->
                <footerNav></footerNav>
            </div>
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
        methods: {
        },
        created() {
        },
        mounted (){
        }
    }
</script>
<style scoped lang='less'>
    .home{
        .menu_right{
            border:1px solid red;
            overflow: auto;
            position: absolute;
            right:0;
            top:0;
            bottom:0;
            .menu_content{
                width:100%;
                background:#F6F7FC;
            }

        }
    }
</style>
