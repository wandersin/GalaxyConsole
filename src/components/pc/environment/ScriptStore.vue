<template>
  <el-tabs type="border-card" v-model="selectedTab">
    <el-tab-pane>
      <span slot="label">查询</span>
      <div id="script-store-body">
        <el-row>
          <el-skeleton animated :rows="1"/>
        </el-row>
        <el-row :gutter="30">
          <el-col v-for="(item, index) in scriptList"
                  :key="index"
                  :xs="12" :sm="12" :lg="{span: '4-8'}"
                  class="script-item-col">
            <script-item :script-detail="item" :add-script-tab="addScriptTab"/>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label">新建脚本</span>
      <div>新建脚本</div>
    </el-tab-pane>
    <el-tab-pane v-for="tab in scriptTabs"
                 :key="tab.id"
                 :label="tab.title"
                 :name="tab.id">
      <script-detail :script-detail="tab.script"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import ScriptItem from "@/components/pc/environment/ScriptItem.vue";
import ScriptDetail from "@/components/pc/environment/ScriptDetail.vue";

export default {
  name: "ScriptStore",
  data() {
    return {
      scriptTabs: [],
      selectedTab: '',
      scriptList: []
    }
  },
  components: {
    ScriptItem,
    ScriptDetail
  },
  methods: {
    // 加载脚本列表
    loadScripts() {
      this.$commonUtils.get(`${this.$rock_baseUrl}/script/list`, data => {
        this.scriptList = data;
      })
    },
    // 添加脚本详情标签
    addScriptTab(scriptDetail) {
      // 如果已经有则选中
      let scriptId = scriptDetail.scriptId;
      for (let i = 0; i < this.scriptTabs.length; i++) {
        if (this.scriptTabs[i].id === scriptId) {
          this.selectedTab = scriptId;
          return;
        }
      }
      // 没有添加新标签
      let tab = {};
      tab.title = scriptDetail.scriptName;
      tab.id = scriptId;
      tab.script = scriptDetail;
      this.scriptTabs.unshift(tab);
      this.selectedTab = scriptId;
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

.el-tabs--border-card {
  border: none;
  box-shadow: none;
}

.el-col-lg-4-8 {
  width: 20%;
  margin-top: 2rem;
}
</style>
