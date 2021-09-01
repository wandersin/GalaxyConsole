<template>
  <div id="script-store-body">
    <el-row>
      <el-col>搜索</el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col v-for="(item, index) in scriptList"
              :key="index"
              :xs="12" :sm="12" :lg="{span: '4-8'}"
              class="script-item-col">
        <script-item :script-detail="item"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ScriptItem from "@/components/environment/ScriptItem";

export default {
  name: "ScriptStore",
  data() {
    return {
      scriptList: []
    }
  },
  components: {
    ScriptItem
  },
  methods: {
    // 加载脚本列表
    loadScripts() {
      this.$commonUtils.get(`${this.$rock_baseUrl}/script/list`, data => {
        this.scriptList = data;
      })
    }
  },
  created() {
    this.loadScripts();
  }
}
</script>

<style scoped>
#script-store-body {
  padding: 2rem;
}

.el-col-lg-4-8 {
  width: 20%;
  margin-top: 2rem;
}
</style>
