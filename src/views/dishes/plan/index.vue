<template>
  <div class="app-container dishes_plan">
    <el-card class="filter-container" shadow="never">
      <div class="search-bar">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>
        <div>
          <el-button
            @click="handleCurrentChange()"
            type="primary"
            size="small">
            搜索
          </el-button>

          <el-button
            @click="handleAdd()"
            size="small">
            添加
          </el-button>
        </div>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="searchFormData" size="small" label-width="140px">
          <el-form-item label="方案名称：">
            <el-input style="width: 203px" v-model="searchFormData.name" placeholder="方案名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <div class="search-bar">
        <div>
          <i class="el-icon-tickets"></i>
          <span>数据列表</span>
        </div>
      </div>
    </el-card>
    <div class="table-container">
      <el-table
        :data="list"
        v-loading="listLoading"
        border>
        <el-table-column label="方案名称" align="center" prop="name"></el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime | timeFormat}}
          </template>
        </el-table-column>
        <el-table-column label="是否发布" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.pushedStatus === 1">已发布</span><span v-else>未发布</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center" prop="createBy"></el-table-column>
        <el-table-column label="备注" align="center" prop="description"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleAdd(scope.row)">修改
            </el-button>
            <!-- 发布 or 取消发布 -->
            <el-button
              :disabled="scope.row.pushedStatus === 1"
              size="mini"
              @click="handleRelease(scope.row)">发布
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        layout="total, prev, pager, next,jumper"
        :page-count="totalPageCount"
        :page-size="searchFormData.pageSize"
        @current-change="handleCurrentChange"
        :current-page.sync="searchFormData.pageNnum" v-show="totalPageCount > searchFormData.pageSize">
      </el-pagination>
      <!--<el-pagination-->
        <!--background-->
        <!--layout="total, prev, pager, next"-->
        <!--:total="totalCount"-->
        <!--:page-size="searchFormData.pageSize"-->
        <!--@current-change="queryData"-->
        <!--:current-page="searchFormData.pageNnum" v-show="totalCount > searchFormData.pageSize">-->
      <!--</el-pagination>-->
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      class="dialog-form"
      width="800px">
      <el-form :model="dialogForm" ref="dialogForm" :rules="rules" label-width="120px">
        <el-form-item label="菜品分类名称" prop="name">
          <el-input v-model="dialogForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="菜品分类说明">
          <el-input type="textarea" :rows="4" :maxlength="50" resize="none" v-model="dialogForm.description" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dishes_classify',
  data() {
    return {
      listLoading: false,
      listQuery: {},
      list: [{
        id: 1,
        name: '',
        description: '',
        whenCreated: 1528944589000
      }],
      searchFormData: {
        name:  '',
        pageNnum: 1,
        pageSize: 10
      },
      totalPageCount: 0,
      dialogForm: {},
      rules: {
        name: [
          {required: true, message: '请输入菜品分类名称', trigger: 'blur'},
          {min: 1, max: 10, message: '长度不能超过10个字符', trigger: 'blur'}
        ]
      },
      dialogVisible: false,
      dialogTitle: '',
      btnDis: false
    }
  },
  methods: {
    handleCurrentChange () {
      let params = {}
      Object.keys(this.searchFormData).forEach(key => {
        if (this.searchFormData[key] != '') {
          params[key] = this.searchFormData[key];
        }
      })
      this.$api.dishe.recommendSchemeList(params).then(res=>{
        if (res.success) {
          this.list = res.data.list
          this.totalPageCount = res.data.total

        }
      })
    },
    handleAdd (item) {
      if (item) {
        var params = JSON.stringify(item)
        this.$router.push({path: 'updatePlan', query: {params: params}})
      } else {
        this.$router.push({path: 'createPlan'})
      }
    },
    handleUpdate (row) {
      const { id, name, description } = row;
      this.dialogForm = {
        id,
        name,
        description
      };
      this.dialogVisible = true;
      this.dialogTitle = '修改菜品分类';
      this.$nextTick(() => {
        this.$refs['dialogForm'].clearValidate();
      });
    },
    handleRelease (row) {
      this.$api.dishe.recommendSchemePublish({id:row.id})
        .then(res=>{
          if (res.success) {
            this.handleCurrentChange ()
          }
        })
    },
    handleEditConfirm () {
      if (this.btnDis) return;
        this.btnDis = true;
        this.$refs['dialogForm'].validate(valid => {
          if (valid) {
            if (this.dialogForm.id) {
              // 更新

              this.dialogVisible = false;
              this.btnDis = false;
            } else {
              let params = {}
              // Object.keys(this.dialogForm).forEach(key => {
              //   if (this.searchFormData[key] != '') {
              //     params[key] = this.searchFormData[key];
              //   }
              // })
              this.$api.dishe.recommendSchemeSave(params).then(res=>{
                if (res.success) {
                  this.handleCurrentChange ()
                }
              })

              this.dialogVisible = false;
              this.btnDis = false;
            }
          } else {
            this.btnDis = false;
          }
        })
    }
  },
  created () {
    this.handleCurrentChange ()
  }
}
</script>
