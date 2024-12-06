<template>
  <el-tabs class="emby-resources-panel" type="border-card">
    <el-tab-pane label="资源总览">
      <emby-resources-view/>
    </el-tab-pane>
    <el-tab-pane label="资源管理">
      <emby-resources-manager/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import EmbyResourcesView from "@/components/pc/video/EmbyResourcesView.vue";
import EmbyResourcesManager from "@/components/pc/video/EmbyResourcesManager.vue";

export default {
  name: "EmbyResources",
  components: {
    EmbyResourcesManager,
    EmbyResourcesView
  },
}
</script>

<style scoped>
.emby-resources-panel {
  border: none;
  height: 100%;
  width: 100%;
}
</style>