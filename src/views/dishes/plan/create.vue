<template> 
  <information :value="productParam" :is-edit='isEdit'></information>
</template>
<script>
  import information from './information'
  export default {
    name: 'create',
    components: { information },
    data() {
      return {
        isEdit: false,
        productParam: {},
      }
    },
    created() {
      this.initData()
      let queryId = this.$route.query.id;
      if (queryId) {
        this.isEdit = true;
        this.getProduct(queryId);
      }
    },
    methods: {
      initData() {
        console.log(1233333)
        console.log(this.$route.query)
        if (this.$route.query.params) {
          this.productParam = JSON.parse(this.$route.query.params)
          console.log(this.productParam)
        }
      },
      // 详情
      getProduct (id) {
        // 调详情接口
      }
    }
  }
</script>
