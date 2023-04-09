<template>
  <el-row class="json-viewer-row">
    <el-col class="json-input-col json-col" :span="11">
      <textarea id="json-srt-input" placeholder="请输入json内容" v-model="jsonTmp"/>
    </el-col>
    <el-col class="json-btn-col json-col" :span="2">
      <el-button id="json-btn" round @click="transform">&gt;</el-button>
    </el-col>
    <el-col class="json-viewer-col json-col" :span="11">
      <json-viewer id="json-viewer" :value="jsonObj" copyable></json-viewer>
    </el-col>
  </el-row>
</template>

<script>
import JsonViewer from 'vue-json-viewer'

export default {
  name: "SimpleJsonViewer",
  components: {
    JsonViewer
  },
  data() {
    return {
      jsonStr: "{}",
      jsonTmp: "{}"
    }
  },
  methods: {
    transform() {
      this.jsonStr = this.jsonTmp;
    }
  },
  mounted() {
    window.onerror = function () {
      this.$message({
        message: `Json字符串格式有误`,
        type: 'success'
      });
    }
  },
  computed: {
    jsonObj() {
      return JSON.parse(this.jsonStr);
    }
  }
}
</script>

<style scoped>
.json-viewer-row {
  height: 100%;
  padding: 1rem;
}

.json-col {
  height: 100%;
  padding: 1rem;
}

.json-input-col {
}

.json-viewer-col {
  overflow: auto;
}

#json-srt-input {
  width: 100%;
  height: 100%;
  resize: none;
}

#json-viewer {
  width: 100%;
  height: 100%;
  overflow: auto;
  border: 1px lightgray solid;
}

.json-btn-col {
  position: relative;
}

#json-btn {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  margin: auto;
  font-size: 2rem;
  height: 2.5rem;
  line-height: 2.5rem;
  width: 75%;
  padding: 0;
}
</style>