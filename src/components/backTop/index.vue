<template>
    <div 
        class="backTop" 
        :style="{'opacity':opacity}" 
        v-show="gotop"
        @mouseenter="enterBackTop" 
        @mouseout="outBackTop"
        @click="handleScrollTop"
         >
        <div class="back"></div>
    </div>
</template>


<script>
  export default {
      name:'backTop',
      data(){
          return {
            opacity:'.3',
            gotop:false,
            scrollHeight:100
          }
      },
      props:['ele'],
      created(){

      },
      mounted(){
          // 此处true需要加上，不加滚动事件可能绑定不成功
         window.addEventListener("scroll", this.handleScroll, true);
      },
      methods:{ 
        enterBackTop(){
            this.opacity = '1';
        },
        outBackTop(){
            this.opacity = '.3';
        },
        handleScroll(e) {
            let scrolltop = e.target.scrollTop;
            scrolltop > this.scrollHeight ? (this.gotop = true) : (this.gotop = false);
        },
        handleScrollTop() {
            this.$nextTick(()=>{    
                this.ele.scrollTop = 0;
            })
        }
    }
  }
</script>

<style lang="less" scoped>
     .backTop{
         position: fixed;
         right: 50px;
         bottom: 50px;
         z-index: 10;
         cursor: pointer;
         .back{
            background: url('../../assets/img/backTop.png') no-repeat;
            background-position: center;
            background-size: 16px;
            background-color: #1890ff;
            width: 40px;
            height: 40px;
            overflow: hidden;
            color: #fff;
            text-align: center;
            border-radius: 50%;
            transition: all .3s;
            box-shadow: 0 0 15px 1px rgba(69,65,78,.1)
         }
     }
</style>
