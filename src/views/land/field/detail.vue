<template>
  <div style="margin-top: 50px" id="editInfo">
    <el-form :model="param" ref="productInfoForm" label-width="10px" style="width: 1000px;padding: 10px">
      <el-form-item>
        <!--<label>种植计划：</label>-->
        <!--<span>绿色成林 （或自选计划）</span>-->
        <label>地名：</label>
        <span>{{blockDetail.fieldName}}({{blockDetail.fieldNickname}})</span>
        <!--<el-button>停止种植</el-button>-->
      </el-form-item>
      <el-form-item label="">
        <div class="title">最大产量：（约{{blockDetail.totalEstimateOutput}}公斤）</div>
        <div class="" style="border: 1px solid #000">
          <el-row v-for="index in 3" :key="index">
            <el-col class="content" :span="6" v-for="count in 4" :class="{active:blockDetail.currentMonth === 4*(index-1)+count}" :key="4*(index-1)+count" @click.native="getMonthPlan(4*(index-1)+count)">
              <div class="grid-content bg-purple" style="text-align: center">{{4*(index-1)+count}}月</div>
              <ul v-if="blockDetail.fieldPlanItemResultList&&blockDetail.fieldPlanItemResultList.length">
                <li v-for="(item,i) in blockDetail.fieldPlanItemResultList[4*(index-1)+count-1].planItemProductRelationList">{{item.product.name}}</li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item v-if="false">
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
      <el-form-item v-if="false">
        <el-button type="primary" size="medium" @click="createSmall()">生成最小产量</el-button>
      </el-form-item>
      <el-form-item label="" v-if="false">
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
      <el-form-item>
        <div>实际种植 截止目前 {{blockDetail.totalFactOutput}}公斤：</div>
        <div class="table-container">
          <el-table :data="blockDetail.planItemProductHarvestDetailList" border style="width: 100%" stripe>
            <el-table-column
              prop="sowingTime"
              align="center"
              label="播种时间">
            </el-table-column>
            <el-table-column
              align="center"
              prop="pickingTime"
              label="成熟时间">
            </el-table-column>
            <el-table-column
              align="center"
              prop="product"
              label="菜品">
            </el-table-column>
            <el-table-column
              prop=""
              align="center"
              label="收获">
              <template slot-scope="scope">
                <span>{{scope.row.harvestOutput}}公斤</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="deliveryTime"
              label="发货时间">
            </el-table-column>
            <el-table-column
              align="center"
              label="运送方式">
              <template slot-scope="scope">
                <span v-if="scope.row.deliveryType === 0">自配</span>
                <el-button type="text" @click.native="sendProduct(scope.row.id)" v-else>发货</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <div>当前田地状态：</div>
        <div class="table-container">
          <el-table :data="blockDetail.currentMonthPlanItemProductHarvestDetailResult" style="width: 100%">
            <el-table-column
              prop=""
              align="center"
              label="菜品">
              <template slot-scope="scope">
                <p v-if="scope.row.product.albumPics">
                  <img v-if="index === 0" style="width: 50px;height: 50px" v-for="(item,index) in scope.row.product.albumPics.split(',')" :key="item" :src="'http://www.hzqxty.com/'+item" alt="">
                  <span>{{scope.row.product.name}}</span>
                </p>
                <span v-else>{{scope.row.product.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.harvestStatus === 0">未种植</span><span v-if="scope.row.harvestStatus === 1">种植中</span><span v-if="scope.row.harvestStatus === 3">采摘中</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop=""
              label="预计产量">
              <template slot-scope="scope">
                <span>{{scope.row.relationResult.estimateOutput}}公斤</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <p v-if="scope.row.harvestStatus === 0">
                  <el-button type="text"  @click.native="farmBlockFieldSow(scope.row.productId)">播种</el-button>
                </p>
                <p v-if="scope.row.harvestStatus === 1">
                  <el-button type="text"  @click.native="farmBlockFieldMature(scope.row.productId)">成熟了</el-button>
                  <el-button type="text"  @click.native="startPick(scope.row.productId)">提醒采摘</el-button>
                </p>
                <p v-if="scope.row.harvestStatus === 3">
                  <el-button type="text"  @click.native="nexts(scope.row.productId)">种下一个菜</el-button>
                  <el-button type="text"  @click.native="jieshu(scope.row.productId)">结束种植</el-button>
                </p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="goBacks()">返回</el-button>
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
        tableData: [],
        id:'',
        param: {
          // name: '',
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
          // name: '',
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
        curYear: '',
        blockDetail:{}
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
      sendProduct(id){
        this.$api.land.farmBlockFieldeliver({planItemProductRelationId:id}).then(res => {
          console.log(res)
          if (res.success) {

          } else {

          }

        })
      },
      farmBlockFieldSow(id){
        this.$api.land.farmBlockFieldSow({planItemProductRelationId:id}).then(res => {
          console.log(res)
          if (res.success) {

          } else {

          }

        })
      },
      farmBlockFieldMature(id){
        this.$api.land.farmBlockFieldMature({planItemProductRelationId:id}).then(res => {
          console.log(res)
          if (res.success) {

          } else {

          }

        })
      },
      startPick(id){
        this.$api.land.startPick({planItemProductRelationId:id}).then(res => {
          console.log(res)
          if (res.success) {

          } else {

          }

        })
      },
      getParam () {
        // console.log(this.value)
        this.id = this.$route.query.id;
        console.log(this.id)
        this.$api.land.farmBlockDetail({id:this.id}).then(res => {
          console.log(res)
          if (res.success) {
            this.blockDetail = res.data;
          } else {

          }

        })
        var item = this.value
        this.param = {
          // name: item.name,
          // nickname: item.nickname,
          // growthPeriodLowerLimit: item.growthPeriodLowerLimit,
          // growthPeriodHigherLimit: item.growthPeriodHigherLimit,
          // productYields: item.productYields,
          // description: item.description,
          // productCategoryId: item.productCategoryId,
          // productCategoryName: item.productCategoryName,
          // sowType: item.sowType,
          // months: item.months,
          // id: item.id
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
          // name: '',
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
          // var item = this.cateData.tableData[i]
          if (item.id == id) {
            // this.cateData.productCategoryName = item.name
          }
        }
      },
      queryCateData(page) {
        this.searchCateData.pageNnum = page
        this.productCategoryList()
      },
      // 取消与提交
      goBack () {
        console.log(this.$router)
        this.$router.go(-1)
      },
      goBacks() {
        this.$router.go(-1)
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
    height: 130px;
    background: #eee;
  }

  .active {
    background: lightyellow;
  }

  ul {
    overflow: hidden;
    padding-left: 0;
  }
  li {
    float: left;
    list-style: none;
    width: 100%;
    text-align: center;
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
  .el-table th {
    background: #f5f7fa;
  }
</style>
