<template>
  <div class="app-container land_farm">
    <el-card class="filter-container" shadow="never">
      <el-form :inline="true" :model="searchFormData" size="small">
        <el-form-item label="用户">
          <el-input v-model="searchFormData.memberUsername"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchFormData.memberPhone"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchFormData.operateType">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item,i in typeList" :key="i" :label="item.key" :value="item.val"></el-option>
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
      <div>
        <span>总收入</span>
        <span style="margin-left: 100px">总支出</span>
      </div>
      
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
          prop="operateTime"
          align="center"
          label="操作时间">
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.operateType === 0">支付租金</span>
            <span v-if="scope.row.operateType === 1">体现</span>
            <span v-if="scope.row.operateType === 2">奖励</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          align="center"
          label="金额">
        </el-table-column>
        <el-table-column
          prop="factAmount"
          align="center"
          label="实际金额">
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
                    memberUsername: '',
                    memberPhone: '',
                    operateType: '',
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
                typeList: [
                    {key: '支付租金', val: 0},
                    {key: '提现', val: 1},
                    {key: '奖励', val: 2}
                ]
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
                  params[key] = this.searchFormData[key]
                })
                this.$api.content.balancePage(params).then(res => {
                    if (res.success) {
                        this.tableData = res.data.commonPage.list
                        this.totalCount = res.data.commonPage.total
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
                    memberUsername: '',
                    memberPhone: '',
                    operateType: '',
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
            }
        }
    }
</script>
