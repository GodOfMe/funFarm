<template>
  <div style="margin-top: 50px" id="editInfo">
    <el-form :model="param" ref="productInfoForm" label-width="10px" style="width: 1000px;padding: 10px">
      <el-form-item label="" prop="name">
        <label>推荐方案名称:</label>
        <el-input v-model="param.name" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="">
        <div class="title">{{param.id?'最大产量500公斤':'最大产量'}};</div>
        <div class="" style="border: 1px solid #000">
          <el-row v-for="index in 3" :key="index">
            <el-col class="content" :span="6" v-for="count in 4" :class="{active:month.val === 4*(index-1)+count}" :key="4*(index-1)+count" @click.native="getMonthPlan(4*(index-1)+count)">
              <div class="grid-content bg-purple" style="text-align: center">{{4*(index-1)+count}}月</div>
              <ul>
                <li v-for="i in 4" :key="i">黄瓜（{{i}}）</li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="grid-content bg-purple">{{month.key}}蔬菜：</div>
        <ul>
          <li v-for="i in 14" :key="i" style="width: 150px" class="vegetablesType">
            <img :src="img_home_order" alt="">
            <p style="margin-top: 142px">玉米</p>
            <p style="color: red;">（50-60天成熟）</p>
            <p><el-checkbox label="数量"></el-checkbox><el-input style="width: 40px;margin-left: 10px;"></el-input></p>
          </li>
        </ul>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="createSmall()">生成最小产量</el-button>
      </el-form-item>
      <el-form-item label="" v-if="isCreate">
        <div class="title">{{param.id?'最小产量500公斤':'最最小产量'}};</div>
        <div class="" style="border: 1px solid #000">
          <el-row v-for="index in 3" :key="index">
            <el-col class="content" :span="6" v-for="count in 4" :class="{active:month.val === 4*(index-1)+count}" :key="4*(index-1)+count" @click.native="getMonthPlan(4*(index-1)+count)">
              <div class="grid-content bg-purple" style="text-align: center">{{4*(index-1)+count}}月</div>
              <ul>
                <li v-for="i in 4" :key="i">黄瓜（{{i}}）</li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="submitItem()">保存</el-button>
        <el-button type="primary" size="medium" @click="submitItem()">发布</el-button>
        <el-button size="medium" @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import img_home_order from '@/assets/images/home_order.png';
  export default {
    name: 'ProductInfoDetail',
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isCreate:false,
        month:{key: '一月', val: 1},
        img_home_order,
        param: {
          name: '',
          nickname: '',
          growthPeriodLowerLimit: '',
          growthPeriodHigherLimit: '',
          productYields: '',
          description: '',
          productCategoryId: '',
          productCategoryName: '',
          sowType: 1,
          months: '',
          startDate: '',
          endDate: ''
        },
        searchCateData: {
          name: '',
          pageNnum: 1,
          pageSize: 10
        },
        cateData: {
          showDia: false,
          tableData: [],
          productCategoryName: '',
          productCategoryId: '',
          totalCount: 0
        },
        monthList: [
          {key: '一月', val: 1},
          {key: '二月', val: 2},
          {key: '三月', val: 3},
          {key: '四月', val: 4},
          {key: '五月', val: 5},
          {key: '六月', val: 6},
          {key: '七月', val: 7},
          {key: '八月', val: 8},
          {key: '九月', val: 9},
          {key: '十月', val: 10},
          {key: '十一月', val: 11},
          {key: '十二月', val: 12},
        ],
        monthsSelected: ['', ''],
        dateRange: [],
        curYear: ''
      }
    },
    created () {
      this.initData()
    },
    computed: {
      //商品的编号
      productId () {
        return this.value.id
      }
    },
    methods: {
      initData () {
        this.getCurYear()
        this.getParam()
      },

      getCurYear () {
        var date = new Date
        this.curYear = date.getFullYear()
      },
      getParam () {
        console.log(this.value)
        var item = this.value
        this.param = {
          name: item.name,
          nickname: item.nickname,
          growthPeriodLowerLimit: item.growthPeriodLowerLimit,
          growthPeriodHigherLimit: item.growthPeriodHigherLimit,
          productYields: item.productYields,
          description: item.description,
          productCategoryId: item.productCategoryId,
          productCategoryName: item.productCategoryName,
          sowType: item.sowType,
          months: item.months,
          id: item.id
        }
        console.log(this.param.sowType)
        switch (this.param.sowType) {
          case 0:
            break
          case 1:
            this.monthsSelected[0] = +this.value.sowTimeList[0].sowStartTime.substr(5, 2)
            console.log(this.monthsSelected)
            break
          case 2:
            this.dateRange = [this.value.sowTimeList[0].sowStartTime.substr(0, 10), this.value.sowTimeList[0].sowEndTime.substr(0, 10)]
            break
          case 3:
            this.monthsSelected = [+this.value.sowTimeList[0].sowStartTime.substr(5, 2), +this.value.sowTimeList[1].sowStartTime.substr(5, 2)]
            break
        }
      },
      // 菜品分类
      productCategoryList () {
        var params = {}
        Object.keys(this.searchCateData).forEach(key => {
          if (this.searchCateData[key] != '') {
            params[key] = this.searchCateData[key]
          }
        })
        this.$api.dishe.productCategoryList(params).then(res => {
          console.log(res)
          if (res.success) {
            this.cateData.tableData = res.data.list
            this.cateData.totalCount = res.data.total
          } else {
            this.cateData.tableData = []
            this.cateData.totalCount = 0
          }

        })
      },
      // 重置
      resetSearchCateData () {
        this.searchCateData = {
          name: '',
          pageNnum: 1,
          pageSize: 10
        }
        this.cateData.productCategoryId = ''
        this.cateData.productCategoryName = ''
      },

      // 对话框
      openDia () {
        this.resetSearchCateData()
        this.toggleDia(true)
        this.productCategoryList()
      },
      toggleDia (boolean) {
        this.cateData.showDia = boolean
      },
      submitDia () {
        this.param.productCategoryName = this.cateData.productCategoryName
        this.param.productCategoryId = this.cateData.productCategoryId
        this.toggleDia(false)
      },
      selCate (id) {
        for (var i = 0; i < this.cateData.tableData.length; i++) {
          var item = this.cateData.tableData[i]
          if (item.id == id) {
            this.cateData.productCategoryName = item.name
          }
        }
      },
      queryCateData(page) {
        this.searchCateData.pageNnum = page
        this.productCategoryList()
      },
      // 取消与提交
      goBack () {
        this.$router.go(-1)
      },
      submitItem () {
        switch (this.param.sowType) {
          case 0:
            this.param.startDate = this.curYear + '-01-01'
            this.param.endDate = this.curYear + '-12-31'
            break
          case 1:
            this.param.months = this.monthsSelected[0]
            break
          case 2:
            this.param.startDate = this.dateRange[0]
            this.param.endDate = this.dateRange[1]
            break
          case 3:
            this.param.months = this.monthsSelected.join(',')
            break
        }
        var params = {}
        Object.keys(this.param).forEach(key => {
          if (this.param[key] != '' && this.param[key] != false || this.param[key] == 0) {
            params[key] = this.param[key]
          }
        })
        params.ifBatchesPick = 0
        console.log(params)
        if (params.id) { // 修改
          this.$api.dishe.productUpdate(params).then(res => {
            this.$globalFun.res(res)
            if (res.success) {
              this.goBack()
            }
          })
        } else {
          this.$api.dishe.productCreate(params).then(res => {
            this.$globalFun.res(res)
            if (res.success) {
              this.goBack()
            }
          })
        }

      },
      getMonthPlan(index){
        console.log(index,'9877')
        this.month = this.monthList[index - 1]
      },
      createSmall(){
        this.isCreate = !this.isCreate;
      }
    }
  }
</script>

<style scoped>
  #editInfo .productDis {
    width: 480px;
    height: 32px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  #editInfo .productDis:hover {
    border-color: #ccc;
  }



  #editInfo .short .el-input--small .el-input__inner {
    width: 100px;
  }

  .content {
    border: 1px solid #000;
    min-height: 50px;
    background: #eee;
  }

  .active {
    background: lightyellow;
  }

  ul {
    overflow: hidden;
  }
  li {
    float: left;
    list-style: none;
    width: 50%;
  }
  .vegetablesType {
    width: 150px;
    position: relative;
    margin-bottom: 10px;
  }
  .vegetablesType img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 126px;
    height: 132px;
  }
  .ui-flex {
    display: -webkit-box !important;
    display: -webkit-flex !important;
    display: -ms-flexbox !important;
    display: flex !important;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap
  }

  .ui-flex, .ui-flex *, .ui-flex :after, .ui-flex :before {
    box-sizing: border-box
  }

  .ui-flex.justify-center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center
  }
  .ui-flex.center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center
  }
  li p {
    text-align: center;
    margin-top: 10px;
    line-height: 1;
  }
  li img {
    width: 50px;
    height: 50px;
  }
</style>
