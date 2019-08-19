<template>
  <div class="app-container land_farm">
    <el-card class="filter-container" shadow="never">
      <el-form :inline="true" :model="searchFormData" size="small" label-width="100px" class="demo-form-inline">
        <el-form-item label="田地名称">
          <el-input v-model="searchFormData.fieldName"></el-input>
        </el-form-item>
        <el-form-item label="地块名称">
          <el-input v-model="searchFormData.blockName"></el-input>
        </el-form-item>
        <el-form-item label="农场名称">
          <el-input v-model="searchFormData.farmName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryData">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSearchFormData">重置</el-button>
        </el-form-item>
      </el-form>
    
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column
          prop="blockName"
          align="center"
          label="田地昵称">
        </el-table-column>
        <el-table-column
          prop="farmName"
          align="center"
          label="田地名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="所属农场">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="所属地块">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="创建时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="租地时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="到期时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="所属农场">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="联系方式">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="租地人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="状态">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click.native="openDia(scope.row)">详情</el-button>
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
        :current-page.sync="listQuery.pageNum" v-if="false">
      </el-pagination>
    </div>
    
    <el-dialog
      :title="diaParam.title + '地块'"
      :visible.sync="diaParam.showDia"
      class="dialog-form"
      width="600px">
      <el-form :model="dialogForm" ref="dialogForm" label-width="100px" v-show="diaParam.showType == 'info'">
        <el-form-item label="地块名称:">
          <el-input v-model="dialogForm.blockName"></el-input>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input v-model="dialogForm.description"></el-input>
        </el-form-item>
        <el-form-item label="农场:">
          <div class="toTableBtn" @click="clickToTable">{{diaParam.farmName}}</div>
        </el-form-item>
        <el-form-item label="总面积:">
          <el-input v-model.number="dialogForm.area"></el-input>
        </el-form-item>
      </el-form>
      <div class="farmTable" v-show="diaParam.showType == 'table'">
        <el-table :data="diaParam.tableData" border style="width: 100%" stripe>
          <el-table-column
            prop="farmName"
            align="center"
            label=农场名称>
          </el-table-column>
          <el-table-column
            align="center"
            prop="totalArea"
            label="总面积">
          </el-table-column>
          <el-table-column
            align="center"
            label="选择">
            <template slot-scope="scope">
              <el-radio v-model="dialogForm.farmId" :label="scope.row.id" @change="sendnameToDiaParam(scope.row)">
                {{''}}
              </el-radio>
            </template>
          </el-table-column>
        </el-table>
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
                    farmName: '',
                    blockName: '',
                    fieldName: '',
                    pageNnum: 1,
                    pageSize: 10
                },
                diaParam: {
                    showDia: false,
                    title: '添加',
                    showType: 'info', // info 显示输入信息 table显示农场表格
                    tableParams: {
                        pageNnum: 1,
                        pageSize: 10
                    },
                    tableData: [],
                    farmName: ''
                },
                dialogForm: {
                    blockName: '',
                    description: '',
                    farmId: '',
                    area: ''
                },
                tableData: [],
                totalCount: 0
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
                this.$api.land.farmBlockFieldPage(params).then(res => {
                    if (res.success) {
                        this.tableData = res.data.list
                    }
                })
            },
            // 获取数据
            getFarmList () {
                var params = {}
                Object.keys(this.diaParam.tableParams).forEach(key => {
                    if (this.diaParam.tableParams[key] != '') {
                        params[key] = this.diaParam.tableParams[key]
                    }
                })
                this.$api.land.farmPage(params).then(res => {
                    if (res.success) {
                        this.diaParam.tableData = res.data.list
                    }
                })
            },
            
            openDia (item) {
                // this.resetDialogForm()
                // if (item) {
                //     this.dialogForm = {
                //         blockName: item.blockName,
                //         farmId: item.farmId,
                //         area: item.area,
                //         id: item.id
                //     }
                //     this.diaParam.farmName = item.farmName
                //     this.diaParam.title = '修改'
                // } else {
                //     this.diaParam.title = '添加'
                // }
                // this.toggleDia(true)
              if (item) {
                var params = JSON.stringify(item)
                this.$router.push({path: 'fieldDetail', query: {params: params}})
              } else {
                this.$router.push({path: 'createPlan'})
              }
            },
            // 弹框
            toggleDia (boolean) {
                this.diaParam.showDia = boolean
            },
            clickToTable () {
                this.diaParam.tableParams.pageNnum = 1
                this.getFarmList()
                this.diaParam.showType = 'table'
            },
            
            // 重置
            resetSearchFormData () {
                this.searchFormData = {
                    farmName: '',
                    blockName: '',
                    fieldName: '',
                    pageNnum: 1,
                    pageSize: 10
                }
            },
            resetDialogForm () {
                this.dialogForm = {
                    blockName: '',
                    description: '',
                    farmId: '',
                    area: ''
                }
                this.diaParam.farmName = ''
                this.diaParam.showType = 'info'
            },
            // 删除按钮
            removeItem (id) {
                this.$confirm('确定删除该内容吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    this.farmBlockDelete(id)
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
            farmBlockDelete (id) {
                this.$api.land.farmBlockDelete({id: id}).then(res => {
                    if (res.success) {
                        this.getDataList()
                    }
                    this.$globalFun.res(res)
                })
            },
            // 提交
            submitItem () {
                if (this.diaParam.showType == 'info') {
                    var params = this.dialogForm
                    if (this.diaParam.title == '添加') {
                        this.$api.land.farmBlockCreate(params).then(res => {
                            this.$globalFun.res(res)
                            if (res.success) {
                                this.getDataList()
                            }
                            this.toggleDia(false)
                        })
                    }
                    if (this.diaParam.title == '修改') {
                        this.$api.land.farmBlockUpdate(params).then(res => {
                            this.$globalFun.res(res)
                            if (res.success) {
                                this.getDataList()
                            }
                            this.toggleDia(false)
                        })
                    }
                }
                if (this.diaParam.showType == 'table') {
                    console.log('走你')
                    this.diaParam.showType = 'info'
                }
            },
            
            // change事件
            sendnameToDiaParam (item) {
                this.diaParam.farmName = item.farmName
            },
            // 查询
            queryData(page) {
                this.searchFormData.pageNnum = page
                this.getDataList()
            }
        }
    }
</script>
<style lang="scss" scoped>
  .toTableBtn {
    width: 100%;
    height: 32px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    cursor: pointer;
    padding-left: 10px;
  }
  
  .toTableBtn:hover {
    border-color: #ccc;
  }
</style>
