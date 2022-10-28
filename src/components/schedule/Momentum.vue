<template>
<div id="momentum-root">
  <schedule-status scheduleName="momentumAutoDownloadSchedule"/>
</div>
</template>

<script>
import ScheduleStatus from "@/components/schedule/ScheduleStatus";

export default {
  name: "Momentum",
  components: {
    ScheduleStatus
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
