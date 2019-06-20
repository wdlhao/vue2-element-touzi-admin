<template>
    <div class="fillcontain">
        <div class="tabContainer" ref="tabContainer">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('eastChina')"><i class="fa fa-camera-retro"></i>华东区域</span>
                    <china-tabs-table :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('southChina')"><i class="fa fa-bank"></i>华南区域</span>
                    <china-tabs-table :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('centralChina')"><i class="fa fa-cubes"></i>华中区域</span>
                    <china-tabs-table :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('northChina')"><i class="fa fa-fax"></i>华北区域</span>
                    <china-tabs-table :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('northwestChina')"><i class="fa fa-institution"></i>西北区域</span>
                    <china-tabs-table :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('southwestChina')"><i class="fa fa-life-ring"></i>西南地区</span>
                    <china-tabs-table :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                     <span slot="label" @click="toggleTabs('northeastChina')"><i class="fa fa-paper-plane"></i>东北地区</span>
                     <china-tabs-table :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                     <span slot="label" @click="toggleTabs('specialareaChina')"><i class="fa fa-calendar"></i>台港澳地区</span>
                     <china-tabs-table :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
            </el-tabs>
            <pagination :pageTotal="pageTotal"></pagination>
        </div>
    </div>
</template>

<script>
    import chinaTabsTable from './components/chinaTabsTable'
    import data from './data/chinaTabs.json';
    import Pagination from "@/components/pagination";

    export default {
        data(){
            return {
                toggleData:'',
                pageTotal:60,
            }
        },
        components: {
             chinaTabsTable,
             Pagination
        },
        mounted(){
             this.setTabHeight();
             window.onresize = () => {
                this.setTabHeight();
             }
            this.toggleTabs('eastChina');
        },
        methods: {
            setTabHeight(){
                this.$nextTick(() => {
                    this.$refs.tabContainer.style.height =  (document.body.clientHeight - 160)+'px'
                })
            },
            toggleTabs(item){
                this.toggleData = item;
            }
        }
    }
</script>

<style lang="less" scoped>
    .tabContainer{
        overflow: hidden;
    }
    .fa{
        margin-right:5px;
    }
  
</style>


