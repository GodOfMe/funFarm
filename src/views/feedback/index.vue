<template>
  <div class="app-container feedback_opinion">
    <el-card class="filter-container" shadow="never">
      <el-form :inline="true" :model="searchFormData" class="demo-form-inline">
        <el-form-item label="反馈电话">
          <el-input v-model="searchFormData.reportPhone" placeholder="反馈电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryData(1)">查询</el-button>
          <el-button type="primary" @click="resetSearchFormData">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column
          prop="reportMemberName"
          align="center"
          label="反馈用户">
        </el-table-column>
        <el-table-column
          prop="reportPhone"
          align="center"
          label="反馈电话">
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="反馈时间">
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          label="反馈内容">
        </el-table-column>
        <el-table-column
          prop="reportPics"
          align="center"
          label="反馈图片">
          <template slot-scope="scope">
            <p v-if="scope.row.reportPics">
              <img style="width: 50px;height: 50px" v-for="item in scope.row.reportPics.split(',')" :key="item" :src="'http://www.hzqxty.com/'+item" alt="">
            </p>
          </template>

        </el-table-column>
      </el-table>
    </div>
    
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="totalCount"
        :page-size="searchFormData.pageSize"
        @current-change="queryData"
        :current-page.sync="searchFormData.pageNnum" v-show="totalCount > searchFormData.pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import { memberReportPage } from '@/api/content'
    
    export default {
        name: 'audit',
        data () {
            return {
                tableData: [],
                totalCount: 0,
                searchFormData: {
                    pageNnum: 1,
                    pageSize: 10,
                    reportPhone: ''
                }
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
                memberReportPage(params).then(res => {
                    console.log(res)
                    if(res.success) {
                        this.tableData = res.data.list
                        this.totalCount = res.data.total
                    }
                })
            },
            queryData(page) {
                this.searchFormData.pageNnum = page
                this.getDataList()
            },
            
            resetSearchFormData() {
                this.searchFormData = {
                    pageNnum: 1,
                    pageSize: 10,
                    reportPhone: ''
                }
            }
        }
    }
</script>
