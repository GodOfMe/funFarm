<template> 
  <el-card class="form-container" shadow="never">
    <el-steps finish-status="success" align-center>
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品促销"></el-step>
      <el-step title="填写商品属性"></el-step>
      <el-step title="选择商品关联"></el-step>
    </el-steps>
  </el-card>
</template>
<script>
  export default {
    name: 'ProductDetail',
    data() {
      return {
      }
    },
    created(){
    },
    methods: {
    }
  }
</script>
<style>
  .form-container {
    width: 800px;
  }
</style>


