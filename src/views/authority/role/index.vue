<template>
  <div class="role">
    <el-card class="filter-container" shadow="never">
      <el-button type="primary" class="fr" @click.native="openDia()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column
          prop="name"
          align="center"
          label=角色名称>
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="角色描述">
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
    <el-dialog
      :title="diaParam.title + '角色'"
      :visible.sync="diaParam.showDia"
      class="dialog-form"
      width="600px">
      <el-form :model="dialogForm" ref="dialogForm" label-width="100px">
        <el-form-item label="角色名称:">
          <el-input v-model="dialogForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色说明:">
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
        tableData: [],
        diaParam: {
          showDia: false,
          title: '添加'
        },
        dialogForm: {
          name: '',
          description: ''
        }
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        this.getDataList()
      },
      
      // 获取数据
      getDataList() {
        var params = {}
        this.$api.authority.roleList(params).then(res=>{
          if (res.success) {
            this.tableData = res.data
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
            name: item.name,
            description: item.description,
            id: item.id
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
          this.roleDelete(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      roleDelete(id) {
        this.$api.authority.roleDelete({id:id}).then(res=>{
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
      
      // 重置
      resetDiaForm() {
        this.dialogForm = {
          name: '',
          description: ''
        }
      },
      // 提交
      submitItem() {
        var params = this.dialogForm
        if (this.diaParam.title == '编辑') {
          this.$api.authority.roleUpdate(params).then(res=>{
            if (res.success) {
              this.getDataList()
            }
            this.$globalFun.res(res)
            this.toggleDia(false)
          })
        } else {
          this.$api.authority.roleCreate(params).then(res=>{
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
