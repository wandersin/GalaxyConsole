<template>
  <div id="left-menu-root">
    <el-row class="tac">
      <!-- @select事件第一个参数为index, 第二个参数indexPath包括各级菜单的index -->
      <!-- 只有一级菜单时index和indexPath作用相同 -->
      <el-menu class="el-menu-vertical-demo" @select="select" unique-opened>
        <!-- 独立菜单 -->
        <el-menu-item v-for="item in menuList.item" :index="item.index" :key="item.id" :disabled="item.disable">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
          <el-tag v-if="item.tag != null && item.tag !== ''" class="beta-tag" type="danger" effect="plain">{{ item.tag }}</el-tag>
        </el-menu-item>
        <!-- 分组菜单 -->
        <el-submenu v-for="group in menuList.group" :index="group.name" :key="group.name">
          <template slot="title">
            <span class="menu-group-title">{{ group.name }}</span>
          </template>
          <el-menu-item v-for="item in group.list" :index="item.index" :key="item.id" :disabled="item.disable">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
            <el-tag v-if="item.tag != null && item.tag !== ''" class="beta-tag" type="danger" effect="plain">{{ item.tag }}</el-tag>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      menuList: []
    }
  },
  methods: {
    select(index) {
      // 触发自定义事件, 通过事件调用父组件方法
      this.$emit("selectLeftMenu", index);
    }
  },
  created() {
    this.$api.coreIndex.listMenu(1).then(data => {
      this.menuList = data;
    })
  }
}
</script>

<style scoped>
#left-menu-root {
  background-color: lightgoldenrodyellow;
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
