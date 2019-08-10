<template>
  <div style="margin-top: 50px" id="editInfo">
    <el-form :model="param" ref="productInfoForm" label-width="120px" style="width: 600px">
      <el-form-item label="菜品分类：">
        <div class="productDis" @click="openDia">
          {{param.productCategoryName}}
        </div>
      </el-form-item>
      <el-form-item label="菜品名称：" prop="name">
        <el-input v-model="param.name"></el-input>
      </el-form-item>
      <el-form-item label="菜品别名：">
        <el-input v-model="param.nickname"></el-input>
      </el-form-item>
      <el-form-item label="播种时间：">
        <el-radio :label="0" v-model="param.sowType">全年</el-radio>
        <el-radio :label="1" v-model="param.sowType">单月</el-radio>
        <el-radio :label="2" v-model="param.sowType">连续多月</el-radio>
        <el-radio :label="3" v-model="param.sowType">间隔多月</el-radio>
        <el-select v-model="monthsSelected[0]" v-show="param.sowType == 1 || param.sowType == 3" class="short">
          <el-option :label="item.key" v-for="item,i in monthList" :key="i" :value="item.val"></el-option>
        </el-select>
        <span v-show="param.sowType == 1 || param.sowType == 3">月</span>
        <el-select v-model="monthsSelected[1]" v-show="param.sowType == 3" class="short">
          <el-option :label="item.key" v-for="item,i in monthList" :key="i" :value="item.val"></el-option>
        </el-select>
        <span v-show="param.sowType == 3">月</span>
        <el-date-picker v-model="dateRange" type="daterange" value-format="yyyy-MM-dd" v-show="param.sowType == 2"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="生长周期：">
        <el-input-number v-model="param.growthPeriodLowerLimit" :controls="false" :precision="0"
                         :min="1"></el-input-number>&nbsp;天&nbsp;-&nbsp;
        <el-input-number v-model="param.growthPeriodHigherLimit" :controls="false" :precision="0"
                         :min="1"></el-input-number>&nbsp;天
      </el-form-item>
      <el-form-item label="分批采摘：" v-if="false">
        <el-radio v-model="value.radio" label="1">是</el-radio>
        <el-radio v-model="value.radio" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="留存时间：" v-if="false">
        <el-input-number v-model="value.retained" :controls="false" :precision="0" :min="1"></el-input-number>&nbsp;天
      </el-form-item>
      <el-form-item label="产量：">
        <el-input-number v-model="param.productYields" :controls="false" :precision="2" :min="1"></el-input-number>&nbsp;平方/公斤
      </el-form-item>
      <el-form-item label="状态：" prop="status" v-if="false">
        <el-select
          v-model="value.status">
          <el-option
            v-for="item in [{label: '启用', value: true},{label: '停用', value: false}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" :rows="4" :maxlength="50" resize="none" v-model="param.description"
                  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="submitItem()">确认</el-button>
        <el-button size="medium" @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择菜品分类"
      :visible.sync="cateData.showDia"
      class="dialog-form"
      width="650px">
      <div style="width: 100%; height: 500px">
        <el-table :data="cateData.tableData" border style="width: 100%" stripe>
          <el-table-column
            prop="name"
            align="center"
            label=分类名称>
          </el-table-column>
          <el-table-column
            prop="description"
            align="center"
            label=分类说明>
          </el-table-column>
          <el-table-column
            align="center"
            label="选择">
            <template slot-scope="scope">
              <el-radio v-model="cateData.productCategoryId" :label="scope.row.id" @change="selCate">{{''}}</el-radio>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="cateData.totalCount"
            :current-page="searchCateData.pageNnum"
            :page-size="searchCateData.pageSize"
            @current-change="queryCateData">
          </el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleDia(false)">取 消</el-button>
        <el-button type="primary" @click="submitDia">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
                    {key: '01', val: 1},
                    {key: '02', val: 2},
                    {key: '03', val: 3},
                    {key: '04', val: 4},
                    {key: '05', val: 5},
                    {key: '06', val: 6},
                    {key: '07', val: 7},
                    {key: '08', val: 8},
                    {key: '09', val: 9},
                    {key: '10', val: 10},
                    {key: '11', val: 11},
                    {key: '12', val: 12},
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
                console.log(this.$router)
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
                
            }
        }
    }
</script>

<style>
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
</style>
