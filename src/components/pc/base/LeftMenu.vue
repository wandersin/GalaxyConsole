<template>
  <div id="left-menu-root">
    <!-- 左侧菜单 -->
    <el-row class="tac">
      <el-menu class="el-menu-vertical-demo" @select="select" unique-opened>
        <div v-for="menu in menuList.group" :key="menu.name">
          <!-- 分组名称 -->
          <div class="el-submenu__title menu-group-title">{{ menu.name }}</div>
          <!-- 分组条目 -->
          <el-menu-item v-for="item in menu.list" :index="item.index" :key="item.id" :disabled="item.disable">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
            <el-tag v-if="item.tag != null && item.tag !== ''" class="beta-tag" type="danger" effect="plain" size="mini">{{ item.tag }}</el-tag>
          </el-menu-item>
        </div>
      </el-menu>
    </el-row>
    <!-- 捐赠付款码 -->
    <div v-show="env === 'prod'" id="donate-me">
      <el-popover placement="top" width="300" trigger="hover">
        <el-image style="width: 300px; height: 450px" :src="ali" fit="contain"></el-image>
        <div slot="reference">用起来感觉还不错<br>请我喝杯咖啡吧</div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      ali: `${this.$minio_endpoint}/image/1b/1b21890d87fe0613e22de53995eaa16f`,
      menuList: [],
      env: process.env.NODE_ENV // 当前环境
    }
  },
  methods: {
    select(index) {
      // 触发自定义事件, 通过事件调用父组件方法
      this.$emit("selectLeftMenu", index);
    }
  },
  created() {
    this.$api.coreIndex.listMenu(2).then(data => {
      this.menuList = data;
    })
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

.menu-group-title {
    color: gray;
    font-size: .9rem;
}
</style>
