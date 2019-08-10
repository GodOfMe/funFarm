<template>
  <div class="article-cate">
    <el-card class="filter-container" shadow="never">
      <el-button type="primary" class="fr" @click.native="openDia()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column
          prop="categoryName"
          align="center"
          label=标题>
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="说明">
        </el-table-column>
        <el-table-column
          align="center"
          prop="statusStr"
          label="状态">
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
    <div class="pagination-container"></div>
    <el-dialog :title="dia.title + '内容'" :visible.sync="dia.showDia" width="600px">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="分类名称">
          <el-input class="inpWidth" v-model="dia.params.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="分类说明">
          <el-input class="inpWidth" v-model="dia.params.description"></el-input>
        </el-form-item>
        <el-form-item label="标题状态">
          <el-select class="inpWidth" v-model="dia.params.status">
            <el-option :value="0" label="不显示"></el-option>
            <el-option :value="1" label="显示"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dia.showDia = false">取 消</el-button>
        <el-button type="primary" @click.native="submitItem()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { articleCategoryList, articleCategoryCreate ,articleCategoryUpdate,articleCategoryDelete} from '@/api/content'
  
  export default {
    data () {
      return {
        dia: {
          showDia: false,
          title: '新增',
          params: {
            categoryName: '',
            description: '',
            parentId: '',
            status: ''
          }
        },
        tableData: []
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        this.getDataList()
      },
      
      // 重置
      resetDiaParams () {
        this.dia.params = {
          categoryName: '',
          description: '',
          parentId: null,
          status: ''
        }
      },
      // 打开对话框
      openDia (item) {
        this.resetDiaParams()
        if (item) {
          this.dia.title = '编辑'
          this.dia.params = {
            categoryName: item.categoryName,
            description: item.description,
            id: item.id,
            status:item.status,
            parentId: item.parentId
          }
        } else {
          this.dia.title = '新增'
        }
        this.dia.showDia = true
      },
      // 删除按钮
      removeItem(id) {
        this.$confirm('确定删除该内容吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.articleCategoryDelete(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      
      // 接口
      // 获取数据
      getDataList () {
        articleCategoryList().then(res => {
          res.data.forEach(item=>{
            item.statusStr = item.status == 1 ? '显示':'不显示'
          })
          this.tableData=res.data
        })
      },
      // 提交
      submitItem () {
        var params = this.dia.params
        if (this.dia.title == '新增') {
          articleCategoryCreate(params).then((res) => {
            if (res.success) {
              this.getDataList()
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            } else {
              this.$message(
                {
                  type: 'warning',
                  message: res.mesg
                }
              )
            }
            this.dia.showDia = false
          })
        }
        if(this.dia.title == '编辑'){
          articleCategoryUpdate(params).then(res=>{
            if (res.success) {
              this.getDataList()
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            } else {
              this.$message(
                {
                  type: 'warning',
                  message: res.mesg
                }
              )
            }
            this.dia.showDia = false
          })
        }
      },
      // 删除
      articleCategoryDelete(id) {
        articleCategoryDelete({id:id}).then(res=>{
          console.log(res)
          if (res.success) {
            this.getDataList()
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          } else {
            this.$message(
              {
                type: 'warning',
                message: res.mesg
              }
            )
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .btnBar {
    height: 35px;
    width: 100%
  }
</style>
