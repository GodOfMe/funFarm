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
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="方案名称：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="方案名称"></el-input>
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
            {{ scope.row.whenCreated | timeFormat}}
          </template>
        </el-table-column>
        <el-table-column label="是否发布" align="center">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="创建人"></el-table-column>
        <el-table-column label="备注" align="center" prop="description"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.row)">修改
            </el-button>
            <!-- 发布 or 取消发布 -->
            <el-button
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
        :page-size="listQuery.pageSize"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.pageNum">
      </el-pagination>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      class="dialog-form"
      width="400px">
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
    handleCurrentChange () {},
    handleAdd () {
      this.dialogVisible = true;
      this.dialogTitle = '添加菜品分类';
      this.dialogForm = {};
      this.$nextTick(() => {
        this.$refs['dialogForm'].clearValidate();
      });
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
    handleRelease (row) {},
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
              // 添加

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
    
  }
}
</script>
