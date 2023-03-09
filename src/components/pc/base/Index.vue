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
import Welcome from "@/components/pc/base/Welcome.vue";
import LeftMenu from "@/components/pc/base/LeftMenu.vue";
import MainHeader from "@/components/pc/base/MainHeader.vue";
import Momentum from "@/components/pc/schedule/Momentum.vue";
import ImageSearch from "@/components/pc/image/ImageSearch.vue";
import DownloadStation from "@/components/pc/download/DownloadStation.vue";
import PermissionCenter from "@/components/pc/permission/PermissionCenter.vue";

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
    Momentum,
    ImageSearch,
    DownloadStation,
    PermissionCenter
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
  overflow: auto;
}
</style>
