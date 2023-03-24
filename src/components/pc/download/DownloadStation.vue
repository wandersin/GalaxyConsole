<template>
  <el-tabs id="download-station-panel-root" type="border-card">
    <el-tab-pane label="添加下载任务">
      <add-download-task/>
    </el-tab-pane>
    <el-tab-pane label="查看当前任务">
      <list-download-task/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AddDownloadTask from "@/components/pc/download/AddDownloadTask.vue";
import ListDownloadTask from "@/components/pc/download/ListDownloadTask.vue";

export default {
  name: "DownloadStation",
  components: {
    AddDownloadTask,
    ListDownloadTask
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