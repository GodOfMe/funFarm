<template>
  <div class="app-container land_farm">
    <el-card class="filter-container" shadow="never">
      <el-form :inline="true" :model="searchFormData" size="small">
        <el-form-item label="手机号">
          <el-input v-model="searchFormData.initiateTradeMemberPhone"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchFormData.status">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item,i in statusList" :key="i" :label="item.key" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryData(1)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSearchFormData">重置</el-button>
        </el-form-item>
      </el-form>
    
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column
          prop="memberUsername"
          align="center"
          label="用户">
        </el-table-column>
        <el-table-column
          prop="memberPhone"
          align="center"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="applyTime"
          align="center"
          label="审核时间">
        </el-table-column>
        <el-table-column
          prop="transferTime"
          align="center"
          label="打款时间">
        </el-table-column>
        <el-table-column
          prop="withdrawAmount"
          align="center"
          label="提现金额">
        </el-table-column>
        <el-table-column
          prop="alipayPhone"
          align="center"
          label="提现支付宝">
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          label="状态">
          <template slot-scope="scope">
            {{statusList[scope.row.status || 0]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="note"
          align="center"
          label="备注">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.status === 0" @click="shenHe(scope.row.id)">审核</el-button>
            <el-button v-if="scope.row.status === 1" type="text" @click="daKuan(scope.row.id)">打款</el-button>
            <el-button v-if="scope.row.status === 1" type="text" @click="quXiao(scope.row.id)">取消</el-button>
            <span v-if="scope.row.status === 2 || scope.row.status === 3"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, prev, pager, next,jumper"
        :page-count="totalCount"
        :page-size="searchFormData.pageSize"
        @current-change="queryData"
        :current-page="searchFormData.pageNnum" v-show="totalCount > searchFormData.pageSize">
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
        data () {
            return {
                totalCount: 0,
                searchFormData: {
                    memberPhone: '',
                    status: '',
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
                subDiaParam: {
                    showDia: false,
                    adminList: []
                },
                subDialogForm: {
                    adminPhone: '',
                    farmId: ''
                },
                statusList: ['待审核','通过', '未通过','已打款']
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
              console.log(params);
                this.$api.content.withdrawApplyPage(params).then(res => {
                    if (res.success) {
                        this.tableData = res.data.list
                        this.totalCount = res.data.total
                    } else {
                        this.tableData = []
                        this.totalCount = 0
                    }
                })
            },
    
            queryData(page) {
                this.searchFormData.pageNnum = page
                this.getDataList()
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
                    memberPhone: '',
                    status: '',
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
          shenHe(id){
            this.$confirm('是否通过审核', '审核', {
              confirmButtonText: '通过',
              cancelButtonText: '未通过',
              type: 'warning'
            })
              .then(() => {
                this.$api.content.pass({id:id}).then(res => {
                  if (res.success) {
                    this.$message({
                      type: 'info',
                      message: '审核通过'
                    })
                  }
                })
              })
              .catch(() => {
                this.$api.content.reject({id:id}).then(res => {
                  if (res.success) {
                    this.$message({
                      type: 'info',
                      message: '审核未通过'
                    })
                  }
                })
              })
          },
          quXiao(id){
            this.$api.content.withdrawApplyPage({id:id}).then(res => {
              if (res.success) {
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
              }
            })
          },
          daKuan(id){
            this.$confirm('是否已打款', '打款', {
              confirmButtonText: '已打款',
              cancelButtonText: '还未打款',
              type: 'warning'
            })
              .then(() => {
                this.$api.content.transfered({id:id}).then(res => {
                  if (res.success) {
                    this.$message({
                      type: 'info',
                      message: '已打款'
                    })
                  }
                })
              })
              .catch(() => {
                this.$api.content.notTransfered({id:id}).then(res => {
                  if (res.success) {
                    this.$message({
                      type: 'info',
                      message: '还未打款'
                    })
                  }
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
            }
        }
    }
</script>
