<template>
  <div class="app-container land_farm">
    <el-card class="filter-container" shadow="never">
      <el-form :inline="true" :model="searchFormData" size="small">
        <el-form-item label="发起换菜用户">
          <el-input v-model="searchFormData.initiateTradeMemberPhone"></el-input>
        </el-form-item>
        <el-form-item label="换菜用户">
          <el-input v-model="searchFormData.tradeMemberPhone"></el-input>
        </el-form-item>
        <el-form-item label="换菜状态">
          <el-select v-model="searchFormData.tradeStatus">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item,i in tradeStatuList" :key="i" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">重置</el-button>
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
        v-else-if="false"
        layout="total, prev, pager, next,jumper"
        :page-count="totalPageCount"
        :page-size="listQuery.pageSize"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.pageNum" v-if="false">
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
    data() {
      return {
        searchFormData: {
          initiateTradeMemberPhone: '',
          tradeMemberPhone: '',
          tradeStatus: '',
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
        tradeStatuList: [
          {key: '未达成', val:0},
          {key: '已达成', val:1},
          {key: '已发货', val:2},
          {key: '关闭', val:3}
        ]
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData() {
        this.getDataList()
      },
      // 获取数据
      getDataList() {
        var params = {}
        Object.keys(this.searchFormData).forEach(key => {
          if (this.searchFormData[key] != '') {
            params[key] = this.searchFormData[key];
          }
        })
        this.$api.market.tradeBasketPage(params).then(res=>{
          if (res.success) {
            this.tableData = res.data.list
          }
        })
      },
      openDia(item) {
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
      openSubDia(item) {
        this.resetSunDiaForm()
        this.subDialogForm.farmId = item.id
        this.toggleSubDia(true)
      },
      // 弹框
      toggleDia(boolean) {
        this.diaParam.showDia = boolean
      },
      toggleSubDia(boolean) {
        this.subDiaParam.showDia = boolean
      },
      // 重置
      resetSearchFormData() {
        this.searchFormData = {
          initiateTradeMemberPhone: '',
          tradeMemberPhone: '',
          tradeStatus: '',
          pageNnum: 1,
          pageSize: 10
        }
      },
      resetDialogForm() {
        this.dialogForm = {
          name: '',
          description: ''
        }
      },
      resetSunDiaForm() {
        this.subDialogForm = {
          adminPhone: '',
          farmId: ''
        }
      },
      // 删除按钮
      removeItem(id) {
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
          });
        });
      },
      // 删除接口
      prductCategoryDelete(id) {
        this.$api.dishe.prductCategoryDelete({id: id}).then(res=>{
          if (res.success) {
            this.getDataList()
          }
          this.$globalFun.res(res)
        })
      },
      // 提交
      submitItem() {
        var params = this.dialogForm
        console.log('params',params)
        if (this.diaParam.title == '添加') {
          this.$api.dishe.prductCategoryCreate(params).then(res=>{
            this.$globalFun.res(res)
            if (res.success) {
              this.getDataList()
            }
            this.diaParam.showDia = false
          })
        }
        if (this.diaParam.title == '编辑') {
          this.$api.dishe.prductCategoryUpdate(params).then(res=>{
            this.$globalFun.res(res)
            if (res.success) {
              this.getDataList()
            }
            this.diaParam.showDia = false
          })
        }
      },
      submitSubItem() {
        var params = this.subDialogForm
        this.$api.land.farmAddAdmin(params).then(res=>{
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
