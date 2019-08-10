<template>
  <div class="account">
    <el-card class="filter-container" shadow="never">
      <el-button type="primary" class="fr" @click.native="openDia()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column
          prop="roleName"
          align="center"
          label=角色名称>
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
            <el-button type="text" @click.native="openDia(scope.row)">编辑</el-button>
            <el-button type="text" @click.native="removeItem(scope.row.adminId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="diaParam.title + '角色'"
      :visible.sync="diaParam.showDia"
      class="dialog-form"
      width="600px">
      <el-form :model="dialogForm" ref="dialogForm" label-width="100px">
        <el-form-item label="角色名">
          <el-select v-model.number="dialogForm.roleId" style="width: 100%" @change="selRole">
            <el-option v-for="item,i in diaParam.roleList" :key="i" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="dialogForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="dialogForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="dialogForm.password"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="dialogForm.note"></el-input>
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
        tableData: [],
        searchFormData: {
          pageSize: 10,
          pageNnum: 1
        },
        diaParam: {
          showDia: false,
          title: '添加',
          roleList: []
        },
        dialogForm: {
          roleId: '',
          note: '',
          username: '',
          nickName: '',
          password: '',
          email: ''
        }
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        this.getDataList()
        this.getRoleList()
      },
      
      // 获取数据
      getDataList() {
        var params = {}
        Object.keys(this.searchFormData).forEach(key => {
          if (this.searchFormData[key] != '') {
            params[key] = this.searchFormData[key];
          }
        })
        console.log(params)
        this.$api.authority.adminList(params).then(res=>{
          if (res.success) {
            this.tableData = res.data.list
          }
        })
      },
      getRoleList() {
        var params = {}
        this.$api.authority.roleList(params).then(res=>{
          if (res.success) {
            this.diaParam.roleList = res.data
          } else {
            this.$message({
              type: 'warning',
              message: res.msg
            })
          }
        })
      },
      // 弹框
      openDia(item) {
        this.resetDiaForm()
        if (item) {
          this.diaParam.title = '编辑'
          this.dialogForm = {
            roleId: item.roleId,
            note: item.note,
            username: item.username,
            password: item.password,
            email: item.email,
            id: item.adminId
          }
        } else {
          this.diaParam.title = '添加'
        }
        this.toggleDia(true)
      },
      // 删除
      removeItem(id) {
        console.log(id)
        this.$confirm('确定删除该内容吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.adminDelete(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      adminDelete(id) {
        this.$api.authority.adminDelete({id:id}).then(res=>{
          this.$globalFun.res(res)
          if (res.success) {
            this.getDataList()
          }
        })
      },
      // 弹出框状态控制
      toggleDia(boolean) {
        this.diaParam.showDia = boolean
      },
      
      // 选择角色
      selRole(id) {
        for (var i = 0; i < this.diaParam.roleList.length; i ++) {
          var item = this.diaParam.roleList[i]
          if (id == item.id) {
            this.dialogForm.nickName = item.name
          }
        }
      },
      
      // 重置
      resetDiaForm() {
        this.dialogForm = {
          roleId: '',
          note: '',
          username: '',
          nickName: '',
          password: '',
          email: ''
        }
      },
      // 提交
      submitItem() {
        var params = this.dialogForm
        if (this.diaParam.title == '编辑') {
          console.log(params)
          this.$api.authority.adminUpdate(params).then(res=>{
            if (res.success) {
              this.getDataList()
            }
            this.$globalFun.res(res)
            this.toggleDia(false)
          })
        } else {
          this.$api.authority.adminRegister(params).then(res=>{
            if (res.success) {
              this.getDataList()
            }
            this.$globalFun.res(res)
            this.toggleDia(false)
          })
        }
      }
      
      
    }
  }
</script>
