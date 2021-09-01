<template>
  <el-col :span="6" @click.native="selectedThis">
    <el-card :class="selectedClass" shadow="hover">
      <el-row class="count-card-box">
        <el-col :span="12" class="count-card-content-left">
          <div class="content-top">
            <span class="number">{{ countFileResult.fileCount }}</span>
          </div>
          <div class="content-bottom">
            <span>{{ title }}</span>
          </div>
        </el-col>
        <el-col :span="12" class="count-card-content-right">
          <div>
            <span>大小：{{ fileSize }}</span>
            <span>图片：{{ countFileResult.picture }}</span>
            <span>音频：{{ countFileResult.music }}</span>
            <span>视频：{{ countFileResult.movie }}</span>
            <span>其他：{{ countFileResult.other }}</span>
          </div>
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
      countFileResult: {
        fileCount: 0,
        fileSize: 0,
        picture: 0,
        music: 0,
        movie: 0,
        other: 0
      },
      fileSize: '',
      selectedClass: 'count-card'
    }
  },
  methods: {
    loadFileCount() {
      this.$commonUtils.get(`${this.$em_baseUrl}/file/count-files?day=${this.time}`, data => {
        this.countFileResult = data;
        this.fileSize = this.$commonUtils.fileSizeTransform(this.countFileResult.fileSize);
      })
    },
    clearSelection() {
      this.selectedClass = 'count-card';
    },
    // 选择当前card
    selectedThis() {
      this.clear(this.time);
      this.selectedClass = 'count-card selected-card';
    }
  },
  created() {
    this.loadFileCount();
  },
  props: {
    time: Number,
    title: String,
    clear: Function
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
  background-color: white;
  border: 1px solid #23c6c8;
}

.selected-card {
  background-color: white;
  border: 1px solid #23c6c8;
}

.count-card-box {
  height: calc(10rem - 40px);
}

.count-card-content-left {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  text-align: center;
}

.count-card-content-left > .content-top {
  position: absolute;
  top: 0;
  left: 0;
  height: 65%;
  width: 100%;
  color: #999;
  font-size: 3.5rem;
}

.count-card-content-left > .content-bottom {
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

.count-card-content-right {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 50%;
}

.count-card-content-right div {
  color: #999;
  position: absolute;
  width: 100%;
  height: min-content;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.count-card-content-right span {
  font-size: 1rem;
  width: 100%;
  float: left;
  margin: .1rem 0;
  padding: 0 1rem;
}
</style>
