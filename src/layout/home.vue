<template>
    <div class="home">
        <head-nav></head-nav>
        <div class="left-fixed-right-auto">
            <left-menu></left-menu>
            <div class="content_page" 
                :style="{'left':sidebar.width}">
                <div class="content">
                    <bread></bread>
                    <router-view></router-view><!--页面渲染入口-->
                </div>
            </div>
        </div>
        <footerNav></footerNav>
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
    .content_page{
        position: fixed;
        top:60px;
        right:0;
        z-index: 3;
        background:#F6F7FC;
    }
     .content{
       width:100%;
       height:100%;
    }
</style>
