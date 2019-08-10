<template>
  <div class="app-container land_farm">
    <el-card class="filter-container" shadow="never">
      <el-form :inline="true" :model="searchFormData" size="small" label-width="100px" class="demo-form-inline">
        <el-form-item label="分类名称">
          <el-input v-model="searchFormData.name"></el-input>
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
          label=分类名称>
        </el-table-column>
        <el-table-column
          prop="description"
          align="center"
          label=分类说明>
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
        :current-page="searchFormData.pageNnum"
        :page-size="searchFormData.pageSize"
        @current-change="queryData"
        v-show="totalCount > searchFormData.pageSize">
      </el-pagination>
    </div>
    
    <el-dialog
      :title="diaParam.title + '菜品分类'"
      :visible.sync="diaParam.showDia"
      class="dialog-form"
      width="600px">
      <el-form :model="dialogForm" ref="dialogForm" label-width="100px">
        <el-form-item label="分类名称:">
          <el-input v-model="dialogForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分类说明:">
          <el-input v-model="dialogForm.description" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      
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
                searchFormData: {
                    name: '',
                    pageNnum: 1,
                    pageSize: 10
                },
                diaParam: {
                    showDia: false,
                    title: '添加'
                },
                dialogForm: {
                    name: '',
                    description: ''
                },
                tableData: [],
                totalCount: 0,
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
                this.$api.dishe.productCategoryList(params).then(res => {
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
                this.resetDialogForm()
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
                this.toggleDia(true)
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
                    this.prductCategoryDelete(id)
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
            prductCategoryDelete (id) {
                this.$api.dishe.prductCategoryDelete({id: id}).then(res => {
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
            
            // 获取
            queryData (page) {
                console.log('走你', page)
                this.searchFormData.pageNnum = page
                this.getDataList()
            },
            handData(page) {
                console.log(page)
                this.searchFormData.pageNnum = page
                console.log(this.$refs.pageion)
                this.getDataList()
            }
        },
    }
</script>

<style lang="scss" scoped>
  .app-container {
    .search-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      button {
        margin-left: 15px;
      }
    }
  }
  
  .adminCardBox {
    width: 100%;
    height: auto;
    
    .adminCard {
      width: 350px;
      height: 35px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      position: relative;
      margin: 10px auto 0;
      border-radius: 2px;
      text-align: center;
      line-height: 35px;
      padding: 0;
      
      .delAdmin {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 2px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        margin: 0;
      }
    }
  }
</style>
