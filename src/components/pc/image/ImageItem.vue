<template>
  <div id="image-show-root" v-loading="loading">
    <div id="image-show-box">
      <div class="image-show-component image-show-header image-hidden-item">
        <i class="el-icon-info ocr-image-operation-item"></i>
        <span>{{ image.datetime | dataFormat('YYYY-MM-DD') }}</span>
      </div>
      <el-button id="ocr-delete-btn" class="image-hidden-item" icon="el-icon-delete" circle></el-button>
      <el-button v-if="image.fileType === 'jpeg'" id="ocr-image2url-btn" class="image-hidden-item" icon="el-icon-upload2" circle></el-button>
      <el-image v-show="!loading" :src="src" :fit="fit" class="image-item" @click="showImageDetail(image)"/>
      <div class="image-show-component image-show-footer image-hidden-item">{{ image.fileName }}</div>
    </div>
  </div>
</template>

<script>
import commonUtils from "@/script/common-utils";

export default {
  name: "ImageItem",
  data() {
    return {
      src: '',
      fit: 'cover',
      loading: true
    }
  },
  props: ['image', 'showImageDetail'],
  created() {
    let root = this;
    // 加载图片
    this.$axios({
      method: 'get',
      url: `${this.$core_baseUrl}/image/${this.image.id}/binary`,
      headers: {
        'X-Auth-Token': localStorage.getItem('xAuthToken')
      },
      params: {
        // 默认为缩略图品质
        quality: 'THUMBNAIL',
        _: commonUtils.getTimestamp()
      },
      responseType: 'blob'
    }).then(response => {
      let reader = new FileReader();
      reader.onloadend = function() {
        // 设置图片src
        root.src = reader.result;
        root.loading = false;
      }
      if (response.data) {
        reader.readAsDataURL(response.data);
      }
    });
  },
}
</script>

<style scoped>
#image-show-root {
  position: relative;
  width: 100%;
  padding-bottom: 65%;
  overflow: hidden;
}

#image-show-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: .5rem;
  border: 1px solid lightgray;
  box-sizing: border-box;
  overflow: hidden;
}

#image-show-box:hover .image-hidden-item {
  visibility: inherit;
}

.image-hidden-item {
  visibility: hidden;
}

.image-show-component {
  height: 15%;
  width: calc(100% - 1rem);
  position: absolute;
  z-index: 99;
  background: lightgray;
  display: flex;
  align-items: center;
  padding: 0 .5rem;
  opacity: .9;
}

#ocr-delete-btn {
  position: absolute;
  top: 20%;
  left: .5rem;
  z-index: 99;
}

#ocr-image2url-btn {
  position: absolute;
  top: 20%;
  right: .5rem;
  z-index: 99;
}

.image-show-header {
  top: 0;
  left: 0;
}

.ocr-image-operation-item {
  margin-right: .5rem;
}

.image-item {
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  border-radius: .5rem;
  margin: 5px;
}

.image-show-footer {
  bottom: 0;
  left: 0;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>