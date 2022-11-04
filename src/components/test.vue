<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="Dialog Title">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号" :maxlength="11" show-word-limit clearable
            prefix-icon='el-icon-mobile' :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="多行文本" prop="field101">
          <el-input v-model="formData.field101" type="textarea" placeholder="请输入多行文本"
            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="计数器" prop="field102">
          <el-input-number v-model="formData.field102" placeholder="计数器"></el-input-number>
        </el-form-item>
        <el-form-item label="下拉选择" prop="field103">
          <el-select v-model="formData.field103" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in field103Options" :key="index" :label="item.label"
              :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围" prop="field105">
          <el-date-picker type="daterange" v-model="formData.field105" format="yyyy-MM-dd"
            value-format="yyyy-MM-dd" :style="{width: '100%'}" start-placeholder="开始日期" end-placeholder="结束日期"
            range-separator="至" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="评分" prop="field106">
          <el-rate v-model="formData.field106" allow-half show-score :disabled='true'></el-rate>
        </el-form-item>
        <el-row gutter="15">
        </el-row>
        <el-form-item label="多选框组" prop="field104">
          <el-checkbox-group v-model="formData.field104" size="medium">
            <el-checkbox v-for="(item, index) in field104Options" :key="index" :label="item.value"
              :disabled="item.disabled">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="下拉选择" prop="field108">
          <el-select v-model="formData.field108" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in field108Options" :key="index" :label="item.label"
              :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      formData: {
        mobile: '',
        field101: undefined,
        field102: undefined,
        field103: undefined,
        field105: null,
        field106: 0,
        field104: [],
        field108: undefined,
      },
      rules: {
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        field101: [{
          required: true,
          message: '请输入多行文本',
          trigger: 'blur'
        }],
        field102: [{
          required: true,
          message: '计数器',
          trigger: 'blur'
        }],
        field103: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        field105: [{
          required: true,
          message: '日期范围不能为空',
          trigger: 'change'
        }],
        field106: [{
          required: true,
          message: '评分不能为空',
          trigger: 'change'
        }],
        field104: [{
          required: true,
          type: 'array',
          message: '请至少选择一个field104',
          trigger: 'change'
        }],
        field108: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
      },
      field103Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field104Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field108Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
  }
}

</script>
<style>
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

</style>
