<template>
    <el-col :span="6">
        <el-card class="count-card" shadow="hover">
            <el-row class="count-card-box">
                <el-col :span="12" class="count-card-content">
                    <div class="count-card-content-left">
                        <div class="content-top">
                            <span class="number">{{ countFileResult.fileCount }}</span>
                        </div>
                        <div class="content-bottom">
                            <span>{{ title }}</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" class="count-card-content">
                    <div>大小：{{ fileSize }}</div>
                    <div>图片：{{ countFileResult.picture }}</div>
                    <div>音频：{{ countFileResult.music }}</div>
                    <div>视频：{{ countFileResult.movie }}</div>
                    <div>其他：{{ countFileResult.other }}</div>
                </el-col>
            </el-row>
        </el-card>
    </el-col>
</template>

<script>
export default {
    name: "FileCountComponent",
    data() {
        return {
            countFileResult: {},
            fileSize: ''
        }
    },
    methods: {
        loadFileCount() {
            this.$commonUtils.get(`${this.$gc_baseUrl}/index/count-files?day=${this.time}`, data => {
                this.countFileResult = data;
                this.fileSize = this.$commonUtils.fileSizeTransform(this.countFileResult.fileSize);
            })
            console.log(this.time);
        }
    },
    created() {
        this.loadFileCount();
    },
    props: {
        time: Number,
        title: String
    }
}
</script>

<style scoped>
.count-card {
    height: 10rem;
    background-color: #f5f5f5;
    border: 1px solid #e8e8e8;
}

.count-card:hover {
    cursor: pointer;
}

.count-card-box {
    height: calc(10rem - 40px);
}

.count-card-content {
    height: 100%;
    border: 1px solid lightcyan;
    box-sizing: border-box;
    position: relative;
}

.count-card-content-left {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    text-align: center;
}

.count-card-content-left>.content-top {
    position: absolute;
    top: 0;
    left: 0;
    height: 65%;
    width: 100%;
    color: #999;
    font-size: 3.5rem;
}

.count-card-content-left>.content-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 35%;
    width: 100%;
    font-size: 1.5rem;
    color: #999;
}

.count-card-content-left span {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.count-card-content-left .number {
    font-weight: bolder;
}
</style>
