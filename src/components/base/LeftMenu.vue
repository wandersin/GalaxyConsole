<template>
  <div id="left-menu-root">
    <el-row class="tac">
      <!-- @select事件第一个参数为index, 第二个参数indexPath包括各级菜单的index -->
      <!-- 只有一级菜单时index和indexPath作用相同 -->
      <el-menu default-active="1" class="el-menu-vertical-demo" @select="select">
        <el-menu-item index="Momentum">
          <i class="el-icon-menu"></i>
          <span slot="title">Momentum</span>
          <el-tag class="beta-tag" type="danger" effect="plain">beta</el-tag>
        </el-menu-item>
        <el-menu-item index="2" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">网易云音乐</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">动态域名解析</span>
        </el-menu-item>
        <el-menu-item index="ImageSearchTest">
          <i class="el-icon-magic-stick"></i>
          <span slot="title">图片OCR</span>
          <el-tag class="beta-tag" type="danger" effect="plain">beta</el-tag>
        </el-menu-item>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  data() {
    return {

    }
  },
  methods: {
    select(index) {
      // 触发自定义事件, 通过事件调用父组件方法
      this.$emit("selectLeftMenu", index);
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo {
  border-right: none;
}

.beta-tag {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 5%;
  margin: auto;
}
</style>
