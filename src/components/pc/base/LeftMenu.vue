<template>
  <div id="left-menu-root">
    <el-row class="tac">
      <!-- @select事件第一个参数为index, 第二个参数indexPath包括各级菜单的index -->
      <!-- 只有一级菜单时index和indexPath作用相同 -->
      <el-menu class="el-menu-vertical-demo" @select="select">
        <el-menu-item index="ImageSearchTest">
          <i class="el-icon-magic-stick"></i>
          <span slot="title">图片OCR</span>
        </el-menu-item>
        <el-menu-item index="DownloadStation">
          <i class="el-icon-download"></i>
          <span slot="title">PT站批量下载</span>
          <el-tag class="beta-tag" type="danger" effect="plain">new</el-tag>
        </el-menu-item>
        <el-menu-item index="1" disabled>
          <i class="el-icon-menu"></i>
          <span slot="title">Momentum</span>
        </el-menu-item>
        <el-menu-item index="2" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">网易云音乐</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">动态域名解析</span>
        </el-menu-item>
      </el-menu>
    </el-row>
    <div id="donate-me">
      <el-popover placement="top" width="300" trigger="hover">
        <el-image style="width: 300px; height: 450px" :src="ali" fit="contain"></el-image>
        <div slot="reference">用起来感觉还不错<br>请我喝杯咖啡吧</div>
      </el-popover>

    </div>
  </div>
</template>

<script>
import ali from '@/images/alipay.jpg';

export default {
  name: "LeftMenu",
  data() {
    return {
      ali: ali
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
#left-menu-root {
  position: relative;
  height: 100%;
  width: 100%;
}

#donate-me {
  position: absolute;
  height: 3rem;
  width: 100%;
  bottom: 2rem;
  text-align: center;
  color: gray;
}

#donate-me:hover {
  cursor: pointer;
}

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
