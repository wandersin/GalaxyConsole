<template>
  <div id="app">
    <div id="app-header">
      <main-header/>
    </div>
    <div id="app-lefter">
      <!-- 子组件自定义选择事件 -->
      <left-menu @selectLeftMenu="selectLeftMenu"/>
    </div>
    <div id="app-main">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Welcome from "@/components/base/Welcome";
import LeftMenu from "@/components/base/LeftMenu";
import MainHeader from "@/components/base/MainHeader";
import Momentum from "@/components/schedule/Momentum";

export default {
  name: 'App',
  data() {
    return {
      currentComponent: ''
    }
  },
  components: {
    Welcome,
    MainHeader,
    LeftMenu,
    Momentum
  },
  methods: {
    selectLeftMenu(index) {
      this.currentComponent = index;
    }
  },
  created() {
    this.selectLeftMenu('Welcome');
  }
}
</script>
<style>
#app-header {
  position: absolute;
  top: 0;
  left: 0;
  height: 7%;
  width: 100%;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}

#app-lefter {
  position: absolute;
  top: 7%;
  left: 0;
  height: 93%;
  width: 15%;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
}

#app-main {
  position: absolute;
  top: 7%;
  right: 0;
  height: 93%;
  width: 85%;
}
</style>
