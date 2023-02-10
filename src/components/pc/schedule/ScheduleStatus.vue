<template>
<div>
  <el-row>
    <el-col>
      <div id="schedule-status-text">运行状态</div>
      <i v-if="running === 'loading'" class="el-icon-loading" style="color: #909399"/>
      <i v-else-if="running === 'running'" class="el-icon-check" style="color: #67C23A"/>
      <i v-else-if="running === 'stopped'" class="el-icon-close" style="color: #E6A23C"/>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "ScheduleStatus",
  props: ['scheduleName'],
  data() {
    return {
      running: 'loading'
    }
  },
  methods: {
    // 查询当前schedule是否在运行中
    loadScheduleStatus(name) {
      this.$commonUtils.get(`http://192.168.3.2:58080/apollo/schedule/all`, data => {
        this.running = data.indexOf(name) > -1 ? 'running' : 'stopped';
      })
    }
  },
  created() {
    this.loadScheduleStatus(this.scheduleName);
  }
}
</script>

<style scoped>
#schedule-status-text {
  display: inline;
  margin: 0 1rem;
}
</style>
