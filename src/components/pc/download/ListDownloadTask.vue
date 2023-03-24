<template>
  <div>
    <el-row id="download-operation-row">
      <el-button class="inline-btn" @click="listDownloadTask">刷新</el-button>
    </el-row>
    <el-row id="download-task-row">
      <el-table v-loading="loading" :data="task" border>
        <el-table-column prop="id" label="任务id" width="100"/>
        <el-table-column prop="torrentId" label="种子id" width="100"/>
        <el-table-column prop="title" label="文件名称"/>
        <el-table-column label="文件大小" width="100">
          <template slot-scope="scope">{{ scope.row.size | fileSizeFormat }}</template>
        </el-table-column>
        <el-table-column label="进度" width="200">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percentage"/>
          </template>
        </el-table-column>
        <el-table-column label="下载速度" width="100">
          <template slot-scope="scope">{{ scope.row.additional.transfer.speedDownload | fileSizeFormat }}</template>
        </el-table-column>
        <el-table-column label="上传速度" width="100">
          <template slot-scope="scope">{{ scope.row.additional.transfer.speedUpload | fileSizeFormat }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">{{ scope.row.status | statusFilter }}</template>
        </el-table-column>

      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ListDownloadTask",
  data() {
    return {
      loading: false,
      task: []
    }
  },
  methods: {
    listDownloadTask() {
      this.loading = true;
      this.$api.coreDownload.task().then(data => {
        this.task = data;
        this.loading = false;
      })
    }
  },
  mounted() {
    this.listDownloadTask();
  },
  filters: {
    statusFilter(status) {
      if (status === 'seeding') {
        return '做种中';
      }
    }
  }
}
</script>

<style scoped>
#download-task-row {
  margin-top: .5rem;
}
</style>