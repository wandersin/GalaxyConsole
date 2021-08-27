<template>
  <div style="padding: 3rem">
    <pipeline-detail-list/>
  </div>
</template>

<script>
import PipelineDetailList from "@/components/environment/PipelineDetailList";

export default {
  name: "PipelineManager",
  components: {
    PipelineDetailList
  }
}
</script>

<style scoped>

</style>
