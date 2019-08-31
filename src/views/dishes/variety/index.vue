<template>
  <div class="app-container land_farm">
    <el-card class="filter-container" shadow="never">
      <el-form :inline="true" :model="searchFormData" size="small" class="demo-form-inline">
        <el-form-item label="菜品名称">
          <el-input v-model="searchFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="菜品别名">
          <el-input v-model="searchFormData.nickname"></el-input>
        </el-form-item>
        <!--<el-form-item label="分批采摘">-->
          <!--<el-select v-model.number="searchFormData.ifBatchesPick">-->
            <!--<el-option value="无限制" label=""></el-option>-->
            <!--<el-option value="分批" label="1"></el-option>-->
            <!--<el-option value="不分批" label="0"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="开始播种时间">-->
          <!--<el-date-picker-->
            <!--v-model="searchFormData.sowStartTime"-->
            <!--type="date"-->
            <!--value-format="yyyy-MM-dd"-->
            <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="结束播种时间">-->
          <!--<el-date-picker-->
            <!--v-model="searchFormData.sowEndTime"-->
            <!--type="date"-->
            <!--value-format="yyyy-MM-dd"-->
            <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <el-form-item label="生长周期下限">
          <el-input v-model="searchFormData.growthPeriodLowerLimit"></el-input>
        </el-form-item>
        <el-form-item label="生长周期上限">
          <el-input v-model="searchFormData.growthPeriodHigherLimit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryData(1)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSearchFormData">重置</el-button>
        </el-form-item>
        <el-button type="primary" class="fr" @click.native="openDia()">添加</el-button>
      </el-form>
    
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column
          prop="name"
          align="center"
          label=菜品名称>
        </el-table-column>
        <el-table-column
          prop="nickname"
          align="center"
          label="菜品别名">
        </el-table-column>
        <el-table-column
          prop="productCategoryName"
          align="center"
          label="类别">
        </el-table-column>
        <el-table-column
          align="center"
          label="播种时间">
          <template slot-scope="scope">
            <p>
              {{scope.row.sowTimeList[0].sowStartTime.substr(0, 10) + '~'+ scope.row.sowTimeList[0].sowEndTime.substr(0,
              10)}}
            </p>
            <p v-if="scope.row.sowTimeList[1]">
              {{scope.row.sowTimeList[1].sowStartTime.substr(0, 10) + '~'+ scope.row.sowTimeList[1].sowEndTime.substr(0,
              10)}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="productYields"
          align="center"
          label="产量">
        </el-table-column>
        <el-table-column
          prop="description"
          align="center"
          label="备注">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click.native="openDia(scope.row)">编辑</el-button>
            <el-button type="text" @click.native="removeItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="totalCount"
        :page-size="searchFormData.pageSize"
        @current-change="queryData"
        :current-page="searchFormData.pageNnum" v-show="totalCount > searchFormData.pageSize">
      </el-pagination>
    </div>
    
    <el-dialog
      :title="diaParam.title + '菜品'"
      :visible.sync="diaParam.showDia"
      class="dialog-form"
      width="950px">
      <div class="inpBox">
        <div class="inpItem">
          <div class="inpName">菜品名称</div>
          <div class="inp">
            <el-input v-model="dialogForm.name"></el-input>
          </div>
        </div>
        <div class="inpItem">
          <div class="inpName">菜品别称</div>
          <div class="inp">
            <el-input v-model="dialogForm.nickname"></el-input>
          </div>
        </div>
        <div class="inpItem">
          <div class="inpName">开始播种时间</div>
          <div class="inp">
            <el-date-picker
              style="width: 100%"
              v-model="dialogForm.sowStartTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="inpItem">
          <div class="inpName">结束播种时间</div>
          <div class="inp">
            <el-date-picker
              style="width: 100%"
              v-model="dialogForm.sowEndTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="inpItem">
          <div class="inpName">生长周期下限</div>
          <div class="inp">
            <el-input v-model.number="dialogForm.growthPeriodLowerLimit">
              <template slot="append">天</template>
            </el-input>
          </div>
        </div>
        <div class="inpItem">
          <div class="inpName">生长周期上限</div>
          <div class="inp">
            <el-input v-model.number="dialogForm.growthPeriodHigherLimit">
              <template slot="append">天</template>
            </el-input>
          </div>
        </div>
        <div class="inpItem">
          <div class="inpName">留存时间</div>
          <div class="inp">
            <el-input v-model.number="dialogForm.retentionDays">
              <template slot="append">天</template>
            </el-input>
          </div>
        </div>
        <div class="inpItem">
          <div class="inpName">产量</div>
          <div class="inp">
            <el-input v-model.number="dialogForm.productYields">
              <template slot="append">公斤/平方</template>
            </el-input>
          </div>
        </div>
        <div class="inpItem">
          <div class="inpName">备注</div>
          <div class="inp">
            <el-input v-model="dialogForm.description"></el-input>
          </div>
        </div>
        <div class="inpItem" v-if="false">
          <div class="inpName">分批采摘</div>
          <div class="inp">
            <div class="radioBox">
              <el-radio v-model="dialogForm.ifBatchesPick" :label="0">不分批</el-radio>
              <el-radio v-model="dialogForm.ifBatchesPick" :label="1">分批</el-radio>
            </div>
          </div>
        </div>
        <div class="inpItem" v-show="dialogForm.ifBatchesPick" v-if="false">
          <div class="inpName">分批采摘时长</div>
          <div class="inp">
            <el-input></el-input>
          </div>
        </div>
        <div class="inpItem" v-show="dialogForm.ifBatchesPick" v-if="false">
          <div class="inpName">分批采摘间隔</div>
          <div class="inp">
            <el-input></el-input>
          </div>
        </div>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleDia(false)">取 消</el-button>
        <el-button type="primary" @click="submitItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: 'land_farm',
        data () {
            return {
                radio: '',
                searchFormData: {
                    name: '',
                    nickname: '',
                    ifBatchesPick: '',
                    sowStartTime: '',
                    sowEndTime: '',
                    growthPeriodHigherLimit: '',
                    growthPeriodLowerLimit: '',
                    pageNnum: 1,
                    pageSize: 10
                },
                totalCount: 0,
                diaParam: {
                    showDia: false,
                    title: '添加'
                },
                dialogForm: {
                    name: '',
                    description: '',
                    nickname: '',
                    ifBatchesPick: 0,
                    sowStartTime: '',
                    sowEndTime: '',
                    growthPeriodHigherLimit: '',
                    growthPeriodLowerLimit: '',
                    retentionDays: '', // 留存时间
                    productYields: '' // 产量
                },
                tableData: [],
                subDiaParam: {
                    showDia: false,
                    adminList: []
                },
                subDialogForm: {
                    adminPhone: '',
                    farmId: ''
                }
            }
        },
        created () {
            this.initData()
        },
        methods: {
            initData () {
                this.getDataList()
            },
            // 获取数据
            getDataList () {
                var params = {}
                Object.keys(this.searchFormData).forEach(key => {
                    if (this.searchFormData[key] != '') {
                        params[key] = this.searchFormData[key]
                    }
                })
                this.$api.dishe.productPage(params).then(res => {
                    if (res.success) {
                        this.tableData = res.data.list
                        this.totalCount = res.data.total
                    } else {
                        this.tableData = []
                        this.totalCount = 0
                    }
                })
            },
            openDia (item) {
                if (item) {
                    var params = JSON.stringify(item)
                    this.$router.push({path: 'updateVariety', query: {params: params}})
                } else {
                    this.$router.push({path: 'addVariety'})
                }
                
                /*this.resetDialogForm()
                if (item) {
                  this.dialogForm = {
                    description: item.description,
                    name: item.name,
                    id: item.id
                  }
                  this.diaParam.title = '编辑'
                } else {
                  this.diaParam.title = '添加'
                }
                this.toggleDia(true)*/
            },
            openSubDia (item) {
                this.resetSunDiaForm()
                this.subDialogForm.farmId = item.id
                this.toggleSubDia(true)
            },
            // 弹框
            toggleDia (boolean) {
                this.diaParam.showDia = boolean
            },
            toggleSubDia (boolean) {
                this.subDiaParam.showDia = boolean
            },
            // 重置
            resetSearchFormData () {
                this.searchFormData = {
                    name: '',
                    nickname: '',
                    ifBatchesPick: '',
                    sowStartTime: '',
                    sowEndTime: '',
                    growthPeriodHigherLimit: '',
                    growthPeriodLowerLimit: '',
                    pageNnum: 1,
                    pageSize: 10
                }
            },
            resetDialogForm () {
                this.dialogForm = {
                    name: '',
                    description: ''
                }
            },
            resetSunDiaForm () {
                this.subDialogForm = {
                    adminPhone: '',
                    farmId: ''
                }
            },
            // 删除按钮
            removeItem (id) {
                this.$confirm('确定删除该内容吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    this.productDelete(id)
                    // this.articleCategoryDelete(id)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            },
            // 删除接口
            productDelete (id) {
                this.$api.dishe.productDelete({id: id}).then(res => {
                    if (res.success) {
                        this.getDataList()
                    }
                    this.$globalFun.res(res)
                })
            },
            // 提交
            submitItem () {
                var params = this.dialogForm
                console.log('params', params)
                if (this.diaParam.title == '添加') {
                    this.$api.dishe.prductCategoryCreate(params).then(res => {
                        this.$globalFun.res(res)
                        if (res.success) {
                            this.getDataList()
                        }
                        this.diaParam.showDia = false
                    })
                }
                if (this.diaParam.title == '编辑') {
                    this.$api.dishe.prductCategoryUpdate(params).then(res => {
                        this.$globalFun.res(res)
                        if (res.success) {
                            this.getDataList()
                        }
                        this.diaParam.showDia = false
                    })
                }
            },
            submitSubItem () {
                var params = this.subDialogForm
                this.$api.land.farmAddAdmin(params).then(res => {
                    this.$globalFun.res(res)
                    if (res.success) {
                        this.getDataList()
                    }
                    this.toggleSubDia(false)
                })
            },
            
            // 查询
            queryData (page) {
                this.searchFormData.pageNnum = page
                this.getDataList()
            }
        }
    }
</script>
<style lang="scss" scoped>
  .inpBox {
    max-height: 600px;
    overflow-y: auto;
    width: 100%;
    font-size: 0;
    margin-top: -20px;
    
    .inpItem {
      width: 46%;
      display: inline-block;
      height: 40px;
      margin-bottom: 10px;
      
      .inpName, .inp {
        height: inherit;
        line-height: 40px;
      }
      
      .inpName {
        font-size: 16px;
        width: 100px;
        text-align: right;
        float: left;
      }
      
      .inp {
        margin-left: 105px;
      }
    }
    
    .inpItem:nth-child(even) {
      margin-left: 4%;
    }
    
    .radioBox {
      margin-left: 10px;
      margin-top: 5px;
    }
  }
</style>
