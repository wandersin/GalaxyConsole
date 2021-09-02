<template>
  <div id="script-item-body">
    <div id="script-item-img">
      <i class="el-icon-setting" id="script-icon"/>
    </div>
    <span id="script-item-name">{{ this.scriptDetail.scriptName }}</span>
    <span id="script-item-desc">{{ this.scriptDetail.scriptDesc }}</span>
    <div id="script-item-footer">
      <span id="script-item-date">发布时间：{{ this.$moment(this.scriptDetail.createdTime).format('YYYY-MM-DD') }}</span>
      <el-button id="script-execute" @click="executeScript(scriptDetail)">查看</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScriptItem",
  methods: {
    // 执行脚本
    executeScript(scriptDetail) {
      this.addScriptTab(scriptDetail);
    }
  },
  props: {
    scriptDetail: Object,
    addScriptTab: Function
  }
}
</script>

<style scoped>
#script-item-body {
  border: solid 1px #ccc;
  height: 20rem;
  border-radius: .5rem;
  position: relative;
}

#script-item-img {
  width: 8rem;
  height: 8rem;
  position: absolute;
  top: .5rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}

#script-icon {
  font-size: 6rem;
  line-height: 8rem;
  color: #484848;
}

#script-item-name {
  position: absolute;
  top: 8.5rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 3rem;
  line-height: 3rem;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bolder;
}

#script-item-desc {
  position: absolute;
  top: 12rem;
  height: 3.5rem;
  width: 100%;
  text-align: center;
}

#script-item-footer {
  height: 4rem;
  width: 100%;
  bottom: 0;
  position: absolute;
}

#script-item-date {
  height: 4rem;
  line-height: 4rem;
  width: 60%;
  top: 0;
  left: 1rem;
  color: gray;
  font-size: .8rem;
  position: absolute;
}

#script-execute {
  position: absolute;
  width: 30%;
  right: 1rem;
  top: .5rem;
  bottom: .5rem;
  margin: auto 0;
}
</style>
