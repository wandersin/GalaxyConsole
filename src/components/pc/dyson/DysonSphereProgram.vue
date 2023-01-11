<template>
  <el-tabs type="border-card">
    <!-- 基本信息查询 -->
    <el-tab-pane style="overflow:visible;">
      <span slot="label"><i class="el-icon-date tab-icon"></i>查询</span>
      <div id="dsp-body">
        <el-row>
          <el-col :span="3">
            <el-input id="name-search" v-model="item.name" placeholder="请输入名称进行搜索"></el-input>
          </el-col>
          <el-col :span="1">
            <i id="item-select" class="el-icon-circle-plus-outline" @click="openSelection"></i>
          </el-col>
        </el-row>
        <div v-if="showSelection" id="selection-box" :style="{'top': mouseClick.y, 'left': mouseClick.x}">
          <selection class="selection" :select-callback="selectItem"/>
        </div>
      </div>
    </el-tab-pane>
    <!-- 量化计算 -->
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date tab-icon"></i>计算</span>
      计算
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Selection from "@/components/pc/dyson/Selection.vue";

export default {
  name: "DysonSphereProgram",
  data() {
    return {
      item: {},
      mouseClick: {
        x: 0,
        y: 0
      },
      showSelection: false
    }
  },
  components: {
    Selection
  },
  methods: {
    // 在鼠标点击位置打开选择框
    openSelection: function (e) {
      // 屏幕大小
      let clientWidth = document.documentElement.clientWidth;
      let clientHeight = document.documentElement.clientHeight;
      this.mouseClick.x = e.pageX - clientWidth * 0.1 + 'px';
      this.mouseClick.y = e.pageY - clientHeight * 0.07 + 'px';
      this.showSelection = true;
    },
    // 选择物品
    selectItem(id) {
      this.$commonUtils.get(`${this.$dsp_baseUrl}/material/${id}`, data => {
        this.item = data;
      })
      this.showSelection = false;
    }
  }
}
</script>

<style scoped>
#dsp-body {
  padding: 1rem;
}

>>> #name-search {
  height: 2rem;
  margin: .5rem 0;
  line-height: 3rem;
}

#item-select {
  font-size: 1.5rem;
  line-height: 3rem;
  height: 3rem;
  width: 3rem;
  text-align: center;
}

#item-select:hover {
  cursor: pointer;
}

#selection-box {
  position: absolute;
  z-index: 999;
}

.el-tabs--border-card {
  border: none;
  box-shadow: none;
}

>>> .el-tabs__content {
  overflow: visible;
  height: 10rem;
}

.tab-icon {
  margin: 0 .5rem;
}
</style>
