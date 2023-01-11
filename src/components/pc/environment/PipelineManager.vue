<template>
  <div style="padding: 3rem">
    <pipeline-detail-list/>
  </div>
</template>

<script>
import PipelineDetailList from "@/components/pc/environment/PipelineDetailList.vue";

export default {
  name: "PipelineManager",
  components: {
    PipelineDetailList
  }
}
</script>

<style scoped>

</style>
