<template>
  <div>
    <el-row id="download-operation-row">
      <el-button class="inline-btn" @click="listDownloadTask">刷新</el-button>
    </el-row>
    <el-row id="download-task-row">
      <el-table v-loading="loading" :data="task" height="80vh" border>
        <el-table-column prop="id" label="任务id" width="100"/>
        <el-table-column prop="torrentId" label="种子id" width="100"/>
        <el-table-column prop="title" label="文件名称">
          <template slot-scope="scope">
            <div class="task-title-box">
              <span>{{ scope.row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文件大小" width="100">
          <template slot-scope="scope">{{ scope.row.size | fileSizeFormat }}</template>
        </el-table-column>
        <el-table-column label="进度" width="200">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percentage"/>
          </template>
        </el-table-column>
        <el-table-column label="下载速度(每秒)" width="130">
          <template slot-scope="scope">{{ scope.row.additional.transfer.speedDownload | fileSizeFormat }}</template>
        </el-table-column>
        <el-table-column label="上传速度(每秒)" width="130">
          <template slot-scope="scope">{{ scope.row.additional.transfer.speedUpload | fileSizeFormat }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">{{ scope.row.status_zh }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot="header" slot-scope="{}">
            <div class="header-cell">
              <span>操作</span>
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">允许删除的任务:<br/>1. 无人做种无下载速度的任务<br/>2. 下载进度小于30%的任务<br/>3. 做种完成的任务</div>
                <i class="el-icon-question header-cell-icon"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <el-row class="download-station-task-operation-row">
              <el-col class="operation-btn-box" :span="12">
                <el-button class="operation-btn" size="small" :disabled="isPauseDisable(scope.row)" plain>暂停下载</el-button>
              </el-col>
              <el-col class="operation-btn-box" :span="12">
                <el-button v-show="isDeleteEnable(scope.row)" class="operation-btn" type="primary" size="small" @click="deleteDownloadTask(scope.row)" plain>删除任务</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DownloadStationTaskViewer",
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
    },
    // 判断当前任务是否可暂停
    isPauseDisable() {
      return true;
    },
    // 判断当前任务是否可删除
    isDeleteEnable(row) {
      if (row.status === '5') {
        return true;
      }
      // 下载完成, 或进度大于 30% 的任务不允许删除
      return row.percentage < 30;
    },
    // 删除任务
    deleteDownloadTask(row) {
      this.$confirm(`即将删除下载任务${row.id}, 此操作无法恢复, 是否继续`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let deleteBody = {
          synology: 'DS1821plus',
          ids: [row.id]
        }
        this.$api.coreDownload.delete(deleteBody).then(() => {
          this.listDownloadTask();
          this.$message({
            type: 'success',
            message: '删除下载任务成功'
          });
        })
      });
    }
  },
  mounted() {
    this.listDownloadTask();
  }
}
</script>

<style scoped>
#download-task-row {
  margin-top: .5rem;
}

.task-title-box {
  width: 100%;
  overflow: hidden;
}

.task-title-box span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.operation-btn {
  width: 100%;
}

.operation-btn-box {
  padding: 5px;
}

.header-cell {
  display: flex;
  align-items: center;
  gap: 8px;  /* 设置元素之间的间距 */
}

.header-cell-icon {
  font-size: 15px;
}

.header-cell-icon:hover {
  cursor: pointer;
}
</style>