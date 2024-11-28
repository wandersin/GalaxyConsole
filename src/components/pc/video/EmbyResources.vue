<template>
  <div class="emby-resources">
    <el-card>
      <!-- 顶部搜索和操作区 -->
      <div class="operation-area">
        <el-input
          v-model="searchQuery"
          placeholder="搜索资源名称"
          style="width: 200px"
          clearable
        >
        </el-input>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>

      <!-- 资源表格 -->
      <el-table
        :data="resourceList"
        style="width: 100%"
        v-loading="loading"
        border
      >
        <el-table-column prop="name" label="名称" width="250"></el-table-column>
        <el-table-column prop="type" label="类型" width="100"></el-table-column>
        <el-table-column prop="size" label="大小" width="120"></el-table-column>
        <el-table-column prop="duration" label="时长" width="120"></el-table-column>
        <el-table-column prop="path" label="存储路径"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row)" class="danger-text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="rule.num"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EmbyResources",
  data() {
    return {
      rule: {
        num: [10, 25, 50, 100]
      },
      searchQuery: '',
      resourceList: [], // 资源列表
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      this.currentPage = 1
      this.fetchData()
    },
    // 获取数据
    fetchData() {
      this.loading = true
      // TODO: 调用后端API获取数据
      // 示例数据
      setTimeout(() => {
        this.resourceList = [
          {
            name: '示例电影.mp4',
            type: '电影',
            size: '1.2GB',
            duration: '02:30:00',
            path: '/movies/示例电影.mp4'
          }
        ]
        this.total = 100
        this.loading = false
      }, 500)
    },
    // 编辑
    handleEdit(row) {
      console.log('编辑', row)
    },
    // 删除
    handleDelete() {
      this.$confirm('确认删除该资源?', '提示', {
        type: 'warning'
      }).then(() => {
        // TODO: 调用删除API
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    // 改变每页显示数量
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped>
.emby-resources {
  padding: 20px;
}
.operation-area {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
  text-align: right;
}
.danger-text {
  color: #F56C6C;
}
</style>