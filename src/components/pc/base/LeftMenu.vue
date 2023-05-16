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
    <div id="donate-me">
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
    this.$api.coreIndex.listMenu().then(data => {
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
