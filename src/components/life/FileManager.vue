<template>
    <div id="file-manager-main">
        <el-row :gutter="20">
            <file-count-component :time="1" :title="'昨日新增'"/>
            <file-count-component :time="7" :title="'近一周新增'"/>
            <file-count-component :time="30" :title="'近一月新增'"/>
            <file-count-component :time="-1" :title="'现有文件'"/>
        </el-row>
    </div>
</template>

<script>
import FileCountComponent from "@/components/life/FileCountComponent";

export default {
    name: "FileManager",
    components: {
        FileCountComponent
    },
    methods: {
        // 统计文件信息
        countFile(time) {
            console.log(time);
        }
    },
    created() {
        // 默认显示昨日新增
        this.countFile(1);
    }
}
</script>

<style scoped>
#file-manager-main {
    margin: 2rem;
}
</style>
