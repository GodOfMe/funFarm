<template>
  <div class="app-container land_farm">
    <el-card class="filter-container" shadow="never">
      <el-form :inline="true" :model="searchFormData" size="small" label-width="100px" class="demo-form-inline">
        <el-form-item label="农场名称">
          <el-input placeholder="农场名称" v-model="searchFormData.farmName"></el-input>
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
          prop="farmName"
          align="center"
          label=农场名称>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTimeStr"
          label="添加时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="totalArea"
          label="总面积">
        </el-table-column>
        <el-table-column
          align="center"
          label="已租面积">
        </el-table-column>
        <el-table-column
          align="center"
          prop="adminsName"
          label="管理员">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click.native="openDia(scope.row)">编辑</el-button>
            <el-button type="text" @click.native="removeItem(scope.row.id)">删除</el-button>
            <el-button type="text" @click.native="openSubDia(scope.row)">管理员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, prev, pager, next,jumper"
        :total="totalCount"
        :page-size="searchFormData.pageSize"
        @current-change="queryData"
        :current-page="searchFormData.pageNnum" v-show="totalCount > searchFormData.pageSize">
      </el-pagination>
    </div>
    
    <el-dialog
      :title="diaParam.title + '农场'"
      :visible.sync="diaParam.showDia"
      class="dialog-form"
      width="600px">
      <el-form :model="dialogForm" ref="dialogForm" label-width="100px">
        <el-form-item label="农场名称:">
          <el-input v-model="dialogForm.farmName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="总面积:">
          <el-input v-model="dialogForm.totalArea" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleDia(false)">取 消</el-button>
        <el-button type="primary" @click="submitItem">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="农场管理员设置"
      :visible.sync="subDiaParam.showDia"
      class="dialog-form"
      width="600px">
      <div style="height: 600px;overflow-y: auto;margin-top: -20px">
        <el-tabs v-model="subDiaParam.activeName">
          <el-tab-pane label="新增管理员" name="1">
            <el-table :data="subDiaParam.adminList" border style="width: 100%" stripe>
              <el-table-column
                prop="roleName"
                align="center"
                label="角色名称">
              </el-table-column>
              <el-table-column
                align="center"
                prop="username"
                label="用户名">
              </el-table-column>
              <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                  <el-radio v-model="subDialogForm.adminUsername" :label="scope.row.username">{{''}}</el-radio>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="移除管理员" name="2">
            <div class="adminCardBox">
              <div class="adminCard" v-for="item,i in subDiaParam.relationList" :key="i">
                <p class="delAdmin" @click="farmDeleteAdmin(item.adminUsername)">X</p>
                {{item.adminUsername}}
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleSubDia(false)">取 消</el-button>
        <el-button type="primary" @click="submitSubItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import { farmPage, farmCreate } from '@/api/land'
    
    export default {
        name: 'land_farm',
        data () {
            return {
                searchFormData: {
                    farmName: '',
                    pageNnum: 1,
                    pageSize: 10
                },
                totalCount: 0,
                diaParam: {
                    showDia: false,
                    title: '添加'
                },
                dialogForm: {
                    farmName: '',
                    totalArea: 0
                },
                tableData: [],
                subDiaParam: {
                    showDia: false,
                    adminList: [],
                    tableParam: {
                        pageSize: 10,
                        pageNnum: 1
                    },
                    activeName: '1',
                    relationList: [] // 选中的管理员
                },
                subDialogForm: {
                    adminUsername: '',
                    farmId: ''
                },
                adminParam: {
                    showDia: false
                }
            }
        },
        created () {
            this.initData()
        },
        methods: {
            initData () {
                this.getDataList()
                this.getAdminList()
            },
            // 获取数据
            getDataList () {
                var params = {}
                Object.keys(this.searchFormData).forEach(key => {
                    if (this.searchFormData[key] != '') {
                        params[key] = this.searchFormData[key]
                    }
                })
                this.$api.land.farmPage(params).then(res => {
                    if (res.success) {
                        this.tableData = res.data.list
                        this.tableData.forEach(item => {
                            item.createTimeStr = item.createTime.substr(0, 10)
                        })
                        this.totalCount = res.data.total
                    } else {
                        this.totalCount = 0
                        this.tableData = []
                    }
                })
            },
            // 获取管理员
            getAdminList () {
                var params = this.subDiaParam.tableParam
                this.$api.authority.adminList(params).then(res => {
                    if (res.success) {
                        this.subDiaParam.adminList = res.data.list
                    }
                })
            },
            openDia (item) {
                this.resetDialogForm()
                if (item) {
                    this.dialogForm = {
                        farmName: item.farmName,
                        totalArea: item.totalArea,
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
                this.subDiaParam.relationList = item.relationList
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
                    farmName: '',
                    pageNnum: 1,
                    pageSize: 10
                }
            },
            resetDialogForm () {
                this.dialogForm = {
                    farmName: '',
                    totalArea: 0
                }
            },
            resetSunDiaForm () {
                this.subDialogForm = {
                    adminUsername: '',
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
                    this.farmDelete(id)
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
            farmDelete (id) {
                this.$api.land.farmDelete({id: id}).then(res => {
                    if (res.success) {
                        this.getDataList()
                    }
                    this.$globalFun.res(res)
                })
            },
            farmDeleteAdmin (name) {
                var params = {
                    farmId: this.subDialogForm.farmId,
                    adminUsername: name
                }
                this.$api.land.farmDeleteAdmin(params).then(res => {
                    this.$globalFun.res(res)
                    if (res.success) {
                        this.getDataList()
                    }
                })
                this.toggleSubDia(false)
            },
            // 提交
            submitItem () {
                var params = this.dialogForm
                params.totalArea = (+params.totalArea)
                if (this.diaParam.title == '添加') {
                    this.$api.land.farmCreate(params).then(res => {
                        this.$globalFun.res(res)
                        if (res.success) {
                            this.getDataList()
                        }
                        this.diaParam.showDia = false
                    })
                }
                if (this.diaParam.title == '编辑') {
                    this.$api.land.farmUpdate(params).then(res => {
                        this.$globalFun.res(res)
                        if (res.success) {
                            this.getDataList()
                        }
                        this.diaParam.showDia = false
                    })
                }
            },
            submitSubItem () {
                if (this.subDiaParam.activeName == 1) {
                    var params = this.subDialogForm
                    this.$api.land.farmAddAdmin(params).then(res => {
                        this.$globalFun.res(res)
                        if (res.success) {
                            this.getDataList()
                        }
                        this.toggleSubDia(false)
                    })
                } else {
                    this.toggleSubDia(false)
                }
            },
            
            // 查询
            queryData (page) {
                this.searchFormData.pageNnum = page
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
