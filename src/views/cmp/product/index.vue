<template>
  <div class="app-container land_farm">
    <el-card class="filter-container" shadow="never">
      <el-form :inline="true" :model="searchFormData" size="small" label-width="100px" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="searchFormData.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="searchFormData.nickname"></el-input>
        </el-form-item>
        <el-form-item label="上级">
          <el-input v-model="searchFormData.superiorLevelPhone"></el-input>
        </el-form-item>
        <el-form-item label="提现">
          <el-input v-model.number="searchFormData.withdrawCountLowerLimit" style="width: 80px"></el-input>
          <span>-</span>
          <el-input v-model.number="searchFormData.withdrawCountHigherLimit"style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model.number="searchFormData.balanceCountLowerLimit" style="width: 80px"></el-input>
          <span>-</span>
          <el-input v-model.number="searchFormData.balanceCountHigherLimit" style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
      <el-table :data="tableData">
        <el-table-column
          prop="phone"
          align="center"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="nickname"
          align="center"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="superiorLevelPhone"
          align="center"
          label="上级">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="下级">
        </el-table-column>
        <el-table-column
          prop="withdrawCount"
          align="center"
          label="提现">
        </el-table-column>
        <el-table-column
          prop="balanceCount"
          align="center"
          label="余额">
        </el-table-column>
        <el-table-column
          prop="landCount"
          align="center"
          label="租地">
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="收件地址">
        </el-table-column>
        <el-table-column
          align="center"
          label="状态">
          <template slot-scope="scope">
            {{statuList[scope.row.status].key}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="openDia(scope.row)">修改</el-button>
            <el-button type="text" @click="forbidItem(scope.row.id)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div class="pagination-container">
      <el-pagination
        background
        v-else-if="false"
        layout="total, prev, pager, next,jumper"
        :page-count="totalPageCount"
        :page-size="listQuery.pageSize"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.pageNum" v-if="false">
      </el-pagination>
    </div>
    
    <el-dialog
      title="修改"
      :visible.sync="diaParam.showDia"
      class="dialog-form"
      width="600px">
      <el-form :model="dialogForm" ref="dialogForm" label-width="100px">
        <el-form-item label="收件地址:">
          <el-input v-model="dialogForm.address" placeholder="请输入"></el-input>
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
                dateRange: [],
                searchFormData: {
                    phone: '',
                    name: '',
                    nickname: '',
                    superiorLevelPhone: '',
                    withdrawCountLowerLimit: '',
                    withdrawCountHigherLimit: '',
                    balanceCountLowerLimit: '',
                    balanceCountHigherLimit: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    pageNnum: 1,
                    pageSize: 10
                },
                tableData: [],
                diaParam: {
                    showDia: false,
                    title: '添加'
                },
                dialogForm: {
                    address: '',
                    id: ''
                },
                statuList: [
                    {key: '禁用', val : 0},
                    {key: '正常', val : 1}
                ]
            }
        },
        created () {
            this.initData()
        },
        methods: {
            initData () {
                this.getData()
            },
            // 获取数据
            getData () {
                var params = this.searchFormData
                console.log(this.$api)
                this.$api.content.memberPage(params).then(res => {
                  this.tableData = res.data.list
                })
            },
            openDia (item) {
                this.dialogForm = {
                    id: item.id,
                    address: item.address
                }
                this.toggleDia(true)
            },
            // 弹框
            toggleDia (boolean) {
                this.diaParam.showDia = boolean
            },
            // 重置
            resetSearchFormData () {
                this.dateRange = []
                this.searchFormData = {
                    phone: '',
                    name: '',
                    nickname: '',
                    superiorLevelPhone: '',
                    withdrawCountLowerLimit: '',
                    withdrawCountHigherLimit: '',
                    balanceCountLowerLimit: '',
                    balanceCountHigherLimit: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    pageNnum: 1,
                    pageSize: 10
                }
            },
            resetDialogForm () {
                this.dialogForm = {
                    address: '',
                    id: ''
                }
            },
            // 提交
            submitItem () {
                var params = this.dialogForm
                this.$api.content.memberUpdate(params).then(res=>{
                    this.$globalFun.res(res)
                    if (res.success) {
                        this.getData()
                    }
                    this.toggleDia(false)
                })
                
            },
            // 查询
            queryData(page) {
                this.searchFormData.pageNnum = page
                this.getData()
            },
            // 禁用
            forbidItem(id) {
                this.$confirm('确定禁用该用户吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    this.memberForbidden(id)
                    // this.articleCategoryDelete(id)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            memberForbidden(id) {
                var params = {id: id}
                this.$api.content.memberForbidden(params).then(res=>{
                    this.$globalFun.res(res)
                    if (res.success) {
                        this.getData()
                    }
                })
            }
        }
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
</style>
