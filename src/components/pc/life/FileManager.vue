<template>
  <div id="file-manager-main">
    <el-row :gutter="20">
      <file-count-component ref="count-card-1" :time="1" :title="'昨日'" :clear="changeTime"/>
      <file-count-component ref="count-card-7" :time="7" :title="'近一周'" :clear="changeTime"/>
      <file-count-component ref="count-card-30" :time="30" :title="'近一月'" :clear="changeTime"/>
      <file-count-component ref="count-card" :time="-1" :title="'现有总数'" :clear="changeTime"/>
    </el-row>
  </div>
</template>

<script>
import FileCountComponent from "@/components/pc/life/FileCountComponent.vue";

export default {
  name: "FileManager",
  components: {
    FileCountComponent
  },
  methods: {
    // 统计文件信息
    countFile(time) {
      console.log(time);
    },
    // 切换
    changeTime(day) {
      // 清空card样式
      this.$refs["count-card-1"].clearSelection();
      this.$refs["count-card-7"].clearSelection();
      this.$refs["count-card-30"].clearSelection();
      this.$refs["count-card"].clearSelection();
      // 加载数据
      this.countFile(day);
    }
  },
  mounted() {
    this.$refs["count-card-1"].selectedThis();
  }
}
</script>

<style scoped>
#file-manager-main {
  margin: 2rem;
}
</style>
