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
import axios from 'axios';
import Welcome from "@/components/base/Welcome";
import FileManager from "@/components/life/FileManager";

export default {
    name: 'App',
    data() {
        return {
            gc_baseUrl: process.env.VUE_APP_GALAXY_CONSOLE_BASEURL,
            // 左侧菜单
            leftMenu: {},
            currentComponent: 'Welcome'
        }
    },
    components: {
        Welcome,
        FileManager
    },
    methods: {
        // 加载左侧菜单
        loadLeftMenu() {
            axios.get(`${this.gc_baseUrl}/index/left-menu`).then(resp => {
                let data = resp.data;
                if (data.status === 'SUCCESS') { // 成功
                    this.leftMenu = data.result;
                } else {
                    alert(data.message);
                }
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
