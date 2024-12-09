<template>
  <el-tabs id="download-station-panel-root" type="border-card">
    <el-tab-pane label="添加下载任务">
      <download-station-task-search-space/>
    </el-tab-pane>
    <el-tab-pane label="查看当前任务">
      <download-station-task-viewer/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import DownloadStationTaskSearchSpace from "@/components/pc/download/DownloadStationTaskSearchSpace.vue";
import DownloadStationTaskViewer from "@/components/pc/download/DownloadStationTaskViewer.vue";

export default {
  name: "DownloadStation",
  components: {
    DownloadStationTaskSearchSpace,
    DownloadStationTaskViewer
  }
}
</script>

<style scoped>
#download-station-panel-root {
  border: none;
  height: 100%;
  width: 100%;
}
</style>