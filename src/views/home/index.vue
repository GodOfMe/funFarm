<template>
  <div class="app-container">
    <div class="un-handle-layout">
      <div class="layout-title">运营数据</div>
      <div class="layout-cont">
        <el-row :gutter="24">
          <el-col :span="8">
            <div class="total-frame">
              <img :src="img_home_order" class="total-icon">
              <div class="total-frame_cont">
                <div class="total-title">总租量（块）：1051</div>
                <div class="total-value">本月销量：950</div>
                <div class="total-value">昨日销量：45</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="total-frame">
              <img :src="img_home_today_amount" class="total-icon">
              <div class="total-frame_cont">
                <div class="total-title">总金额（元）：825,000.00</div>
                <div class="total-value">本月累计：132,500.00</div>
                <div class="total-value">昨日累计：74,500.00</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="total-frame">
              <img :src="img_home_yesterday_amount" class="total-icon">
              <div class="total-frame_cont">
                <div class="total-title">总访问数（人）：5351</div>
                <div class="total-value">本月新增：950</div>
                <div class="total-value">昨日新增：45</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="un-handle-layout">
      <div class="layout-title">待处理数据</div>
      <div class="layout-cont">
        <div class="info-row">
          <span>还未播种租地：15块</span>
          <span>立即查看</span>
        </div>
        <div class="info-row">
          <span>还未播种租地：15块</span>
          <span>立即查看</span>
        </div>
        <div class="info-row">
          <span>还未播种租地：15块</span>
          <span>立即查看</span>
        </div>
        <div class="info-row">
          <span>还未播种租地：15块</span>
          <span>立即查看</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {str2Date} from '@/utils/date';
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  import {homeOperationData, hometodoData} from '@/api/content'
  const DATA_FROM_BACKEND = {
    columns: ['date', 'orderCount','orderAmount'],
    rows: [
      {date: '2018-11-01', orderCount: 10, orderAmount: 1093},
      {date: '2018-11-02', orderCount: 20, orderAmount: 2230},
      {date: '2018-11-03', orderCount: 33, orderAmount: 3623},
      {date: '2018-11-04', orderCount: 50, orderAmount: 6423},
      {date: '2018-11-05', orderCount: 80, orderAmount: 8492},
      {date: '2018-11-06', orderCount: 60, orderAmount: 6293},
      {date: '2018-11-07', orderCount: 20, orderAmount: 2293},
      {date: '2018-11-08', orderCount: 60, orderAmount: 6293},
      {date: '2018-11-09', orderCount: 50, orderAmount: 5293},
      {date: '2018-11-10', orderCount: 30, orderAmount: 3293},
      {date: '2018-11-11', orderCount: 20, orderAmount: 2293},
      {date: '2018-11-12', orderCount: 80, orderAmount: 8293},
      {date: '2018-11-13', orderCount: 100, orderAmount: 10293},
      {date: '2018-11-14', orderCount: 10, orderAmount: 1293},
      {date: '2018-11-15', orderCount: 40, orderAmount: 4293}
    ]
  };
  export default {
    name: 'home',
    data() {
      return {
        orderCountDate: '',
        loading: false,
        dataEmpty: false,
        img_home_order,
        img_home_today_amount,
        img_home_yesterday_amount,
        operateData: ''
      }
    },
    created(){
      this.initData()
    },
    methods:{
      initData() {
        this.getOperateData()
        this.hometodoData()
      },
      
      // 接口
      // 获取运营数据
      getOperateData() {
        // homeOperationData().then(res=>{
        //   console.log('res',res)
        // })
      },
      // 待处理数据
      hometodoData(){
        // hometodoData().then(res=>{
        //   console.log(res)
        // })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }
  .layout-cont {
    padding: 20px;
    .total-frame {
      border: 1px solid #DCDFE6;
      padding: 20px;
      display: flex;
      align-items: center;
      .total-icon {
        color: #409EFF;
        width: 60px;
        height: 60px;
        margin-right: 15px;
      }
      .total-frame_cont {
        color: #333333;
        .total-title {
          margin-bottom: 15px;
          font-size: 16px;
          font-weight: bold;
        }
        .total-value {
          margin-bottom: 10px;
          font-size: 14px;
        }
      }
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      height: 80px;
      border-bottom: 1px solid #cccccc;
      cursor: pointer;
    }
  }
</style>
