<template>
  <div>
    <!-- 头部 -->
    <main-header @showDrawer="showDrawer"/>
    <!-- 侧边栏 -->
    <el-drawer :visible.sync="drawerFlag" direction="ltr" size="70%" :show-close="showClose">
      <left-menu/>
    </el-drawer>
  </div>
</template>

<script>
import MainHeader from "@/components/mobile/base/MainHeader.vue";
import LeftMenu from "@/components/mobile/base/LeftMenu.vue";

export default {
  name: "index",
  data() {
    return {
      drawerFlag: false,
      showClose: false
    }
  },
  methods: {
    showDrawer() {
      this.drawerFlag = true;
    },
    hideDrawer() {
      this.drawerFlag = false;
    }
  },
  components: {
    MainHeader,
    LeftMenu
  }
}
</script>

<style scoped>

</style>