<template>
  <div>
    <!-- 头部 -->
    <div id="mobile-app-header">
      <main-header @showDrawer="showDrawer"/>
    </div>
    <div id="mobile-app-main">
      <component :is="currentComponent"></component>
    </div>
    <!-- 侧边栏 -->
    <el-drawer :visible.sync="drawerFlag" direction="ltr" size="70%" :show-close="showClose">
      <left-menu @selectLeftMenu="selectLeftMenu"/>
    </el-drawer>
  </div>
</template>

<script>
import MainHeader from "@/components/mobile/base/MainHeader.vue";
import LeftMenu from "@/components/mobile/base/LeftMenu.vue";
import ImageSearch from "@/components/mobile/image/ImageSearch.vue";

export default {
  name: "index",
  data() {
    return {
      drawerFlag: false,
      showClose: false,
      currentComponent: ''
    }
  },
  methods: {
    showDrawer() {
      this.drawerFlag = true;
    },
    hideDrawer() {
      this.drawerFlag = false;
    },
    selectLeftMenu(index) {
      this.currentComponent = index;
      this.hideDrawer();
    }
  },
  components: {
    MainHeader,
    LeftMenu,
    ImageSearch,
  }
}
</script>

<style scoped>
#mobile-app-header {
  width: 100%;
  height: 3rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}

#mobile-app-main {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>