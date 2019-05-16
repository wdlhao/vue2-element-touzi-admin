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
	import FooterNav from './footer.vue';

    export default {
        name: 'home',
        data(){
            return {
                win_size: {
                   height: '',
                   width:'',
                },

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
            //用于自适配窗口页面大小
            setSize() {
                //lib_$-->$,window的宽,高的获取是没有问题的。
                this.win_size = {
                    height:document.body.clientHeight-73,
                    width:document.body.clientWidth-180
                }
                //将content部分的宽高，存入store中，
                this.$store.dispatch('set_win_content',this.win_size); //触发动作，content部分的宽高也随即改变。
            },
        },
       created() {
           console.log(this.sidebar);
            // this.setSize();
       },
       mounted (){
            window.onresize = () => {
                //  this.setSize();
            }
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
