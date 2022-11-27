<template>
  <div id="image-ocr-root">
    <el-row id="ocr-input-row">
      <el-col :span="4">
        <el-input v-model="keyWord" placeholder="请输入关键词"></el-input>
      </el-col>
      <el-col :span="2">
        <el-badge value="Beta" class="item">
          <el-button @click="search">搜索</el-button>
        </el-badge>
      </el-col>
      <el-col :span="1">
        <el-tooltip class="item" effect="dark" placement="right">
          <div slot="content">输入要查询的文字开始搜索图片<br>搜索空可以查询图中没有文字的图片<br>搜索*可以查询所有图片<br></div>
          <div id="ocr-point-icon-box">
            <i class="el-icon-warning-outline" id="ocr-point-icon"></i>
          </div>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="item in imageInfo" v-bind:key="item.id" :span="4" class="ocr-image-box">
        <div class="ocr-image-body">
          <div class="ocr-image-operation">
            <i class="el-icon-info ocr-image-operation-item" @click="showImageInfo(item)"></i>
          </div>
          <el-image style="height: 10rem" :src="getImageSrcById(item.id)" :fit="fit" lazy @click="showPreview(getImageSrcById(item.id))"></el-image>
          <div class="ocr-image-url">{{ item.fileName }}</div>
        </div>
      </el-col>
    </el-row>
    <div id="image-ocr-preview-root" v-show="preview" @click="hidePreview">
      <div id="preview-background"></div>
      <div id="preview-image-box">
        <el-image :src="previewSrc" id="preview-image" fit="contain" style="height: 100%; width: 100%;"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageSearch",
  data() {
    return {
      keyWord: '*',
      imageInfo:[],
      fit: 'cover',
      searchRow: 24,
      preview: false,
      previewSrc: ''
    }
  },
  methods: {
    search() {
      this.imageInfo = [];
      this.$api.coreImage.search(this.keyWord, this.searchRow).then(data => {
        for (let i = 0; i < data.length; i++) {
          this.imageInfo.push(data[i]);
        }
      })
    },
    getImageSrcById(id) {
      let token = localStorage.getItem('xAuthToken');
      return `${this.$core_baseUrl}/image/${token}/${id}/binary`;
    },
    showImageInfo(info) {
      alert(JSON.stringify(info, null, 4));
    },
    hidePreview() {
      this.preview = false;
    },
    showPreview(src) {
      if (this.$commonUtils.isEmpty(src)) {
        return;
      }
      this.previewSrc = src;
      this.preview = true;
    }
  }
}
</script>

<style scoped>
#ocr-input-row {
  padding: 1rem .5rem;
  position: relative;
}

#ocr-point-icon {
  font-size: 1.5rem;
  color: gray;
}

#ocr-point-icon-box {
  position: absolute;
  height: calc(100% - 2rem);
  display: flex;
  align-items: center;
}

.ocr-image-box {
  padding: .5rem;
}

.ocr-image-body {
  border: 1px solid lightgray;
  height: 10rem;
  text-align: center;
  position: relative;
}

.ocr-image-body:hover {
  cursor: pointer;
}

.ocr-image-body:hover .ocr-image-url, .ocr-image-body:hover .ocr-image-operation {
  visibility: inherit;
}

.ocr-image-operation {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  height: 2rem;
  width: calc(100% - 1rem);
  background: lightgray;
  line-height: 2rem;
  padding: 0 .5rem;
  opacity: .9;
  z-index: 99;
  text-align: right;
}

.ocr-image-operation-item {
  margin: 0 .5rem;
}

.ocr-image-operation-item:hover {
  cursor: pointer;
}

.ocr-image-url {
  visibility: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2rem;
  width: calc(100% - 1rem);
  background: lightgray;
  text-align: left;
  font-size: .8rem;
  line-height: 2rem;
  padding: 0 .5rem;
  opacity: .9;
  z-index: 99;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#image-ocr-preview-root {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

#preview-background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: gray;
  opacity: .7;
}

#preview-image-box {
  height: 80%;
  width: 80%;
  position: absolute;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
  text-align: center;
}
</style>
