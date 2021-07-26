<template>
    <div id="app">
        <div id="app-header"></div>
        <div id="app-lefter"></div>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            gc_baseUrl: process.env.VUE_APP_GALAXY_CONSOLE_BASEURL,
            // 左侧菜单
            leftMenu: [
                {
                    name: '菜单1',
                    group: 'group1'
                }, {
                    name: '菜单2',
                    group: 'group1'
                }, {
                    name: '菜单3',
                    group: 'group2'
                }
            ]
        }
    },
    components: {},
    methods: {
        // 加载左侧菜单
        loadLeftMenu() {
            console.log(this.gc_baseUrl);
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
</style>
