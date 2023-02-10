<template>
  <div id="selection-panel">
    <div id="selection-header">
      <div class="icon-box" @click="changeType(false)">
        <i class="el-icon-setting"></i>
        <div>组件</div>
      </div>
      <div class="icon-box" @click="changeType(true)">
        <i class="el-icon-s-home"></i>
        <div>建筑</div>
      </div>
    </div>
    <div id="selection-body">
      <material-selection ref="selection" :select-callback="selectCallback"/>
    </div>
  </div>
</template>

<script>
import MaterialSelection from "@/components/pc/dyson/MaterialSelection.vue";

export default {
  name: "Selection",
  components: {
    MaterialSelection
  },
  data() {
    return {}
  },
  methods: {
    changeType(isBuilding) {
      this.isBuilding = false;
      this.$refs.selection.loadMaterial(isBuilding);
    }
  },
  props: {
    selectCallback: Function
  }
}
</script>

<style scoped>
#selection-panel {
  float: left;
  padding: .5rem;
  border: 1px solid lightskyblue;
  background-color: white;
}

#selection-header {
  width: 100%;
  height: 5rem;
  box-sizing: border-box;
  margin-bottom: .3rem;
}

#selection-body {
  border: 1px solid lightskyblue;
  box-sizing: border-box;
}

.icon-box {
  margin: 0 .5rem;
  padding: .5rem 1rem;
  width: 5rem;
  height: 5rem;
  float: left;
  position: relative;
  box-sizing: border-box;
  border: 1px solid white;
}

.icon-box:hover {
  cursor: pointer;
  background-color: aliceblue;
  border: 1px solid lightskyblue;
}

.icon-box i {
  font-size: 2.5rem;
  width: 3rem;
  text-align: center;
}

.icon-box div {
  width: 5rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: .5rem;
}
</style>
