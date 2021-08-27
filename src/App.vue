<template>
  <div id="app">
    <div id="app-header"></div>
    <div id="app-lefter">
      <el-row class="tac">
        <el-menu default-active="0-0" class="el-menu-vertical-demo">
          <el-menu-item-group v-for="(group, groupIndex) in this.leftMenu"
                              :key="group.groupId">
            <template slot="title">{{ group.name }}</template>
            <el-menu-item v-for="(item, itemIndex) in group.menuList"
                          :key="item.itemId"
                          v-bind:index="groupIndex + '-' + itemIndex"
                          @click="changeComponent(item.component)">
              {{ item.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-row>
    </div>
    <div id="app-main">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Welcome from "@/components/base/Welcome";
import FileManager from "@/components/life/FileManager";
import DysonSphereProgram from "@/components/dyson/DysonSphereProgram";
import PipelineManager from "@/components/environment/PipelineManager";
import ServiceDeploy from "@/components/environment/ServiceDeploy";

export default {
  name: 'App',
  data() {
    return {
      // 左侧菜单
      leftMenu: [
        {
          name: '',
          menuList: [
            {
              name: '',
              itemId: ''
            }
          ]
        }
      ],
      currentComponent: 'Welcome'
    }
  },
  components: {
    Welcome,
    FileManager,
    DysonSphereProgram,
    PipelineManager,
    ServiceDeploy
  },
  methods: {
    // 加载左侧菜单
    loadLeftMenu() {
      this.$commonUtils.get(`${this.$gc_baseUrl}/index/left-menu`, data => {
        this.leftMenu = data;
      })
    },
    // 页面切换
    changeComponent(name) {
      if (this.$commonUtils.isNotEmpty(name)) {
        this.currentComponent = name;
      } else {
        this.currentComponent = 'Welcome';
      }
    }
  },
  created() {
    // 加载左侧菜单
    this.loadLeftMenu();
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
  width: 10%;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
}

#app-main {
  position: absolute;
  top: 7%;
  right: 0;
  height: 93%;
  width: 90%;
}
</style>
