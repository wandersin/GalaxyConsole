<template>
  <el-table :data="pipelineDetailList" border style="width: 100%">
    <el-table-column prop="pipelineId" label="流水线id" width="150"/>
    <el-table-column prop="pipelineName" label="流水线名称"/>
    <el-table-column prop="buildBranch" label="默认构建分支" width="200"/>
    <el-table-column prop="deployEnv" label="部署环境" width="200"/>
    <el-table-column prop="status" label="当前状态" width="250">
      <template slot-scope="pipeline">
        <el-tag effect="plain" :type="statusType(pipeline.row.status)">{{ pipeline.row.status }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="350">
      <template slot-scope="pipeline">
        <el-button size="mini"
                   :disabled="btnStatus(pipeline.row.status)"
                   @click="executePipeline(pipeline.row.pipelineId, pipeline.$index)">启动流水线</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "PipelineDetailList",
  data() {
    return {
      pipelineDetailList: []
    }
  },
  methods: {
    // 查询流水线详情列表
    loadPipelineList() {
      this.$commonUtils.get(`${this.$em_baseUrl}/pipeline/list`, data => {
        this.pipelineDetailList = data;
        this.pipelineDetailList.forEach((pipeline, index) => {
          if (pipeline.status === 'RUNNING') {
            this.pollingPipelineStatus(pipeline.pipelineId, index);
          }
        });
      });
    },
    // 启动流水线
    executePipeline(pipelineId, index) {
      // 启动流水线
      this.$commonUtils.post(`${this.$em_baseUrl}/pipeline/execute/${pipelineId}`, null, () => {
        // 设置初始状态
        this.$set(this.pipelineDetailList[index], 'status', 'RUNNING');
        // 轮询流水线结果
        this.pollingPipelineStatus(pipelineId, index);
      });
    },
    // 轮询流水线结果
    pollingPipelineStatus(pipelineId, index) {
      let time = setInterval(() => {
        // 查询结果
        this.$commonUtils.get(`${this.$em_baseUrl}/pipeline/query/${pipelineId}`, data => {
          this.$set(this.pipelineDetailList, index, data);
          // 运行结束停止轮询
          if (this.pipelineDetailList[index].status !== 'RUNNING') {
            clearInterval(time);
          }
        });
      }, 20000);
    },
    // 获取状态type
    statusType(status) {
      switch (status) {
        default:
        case "SUCCESS":
          return "success";
        case "RUNNING":
          return "light";
        case "FAIL":
          return "danger";
      }
    },
    // 按钮状态
    btnStatus(status) {
      return status === 'RUNNING';
    }
  },
  created() {
    this.loadPipelineList();
  }
}
</script>

<style scoped>

</style>
