<template>
  <div id="image-show-root" v-loading="loading">
    <div id="image-show-box">
      <div class="image-show-component image-show-header image-hidden-item">
        <i class="el-icon-info ocr-image-operation-item"></i>
        <span>{{ image.datetime | dataFormat('YYYY-MM-DD') }}</span>
      </div>
      <el-button id="ocr-delete-btn" class="image-hidden-item" icon="el-icon-delete" circle @click="deleteOcrImage(image)"></el-button>
      <el-button v-if="image.fileType === 'jpeg'" id="ocr-image2url-btn" class="image-hidden-item" icon="el-icon-upload2" circle @click="uploadOssPublic(image)"></el-button>
      <el-image v-show="!loading" :src="src" :fit="fit" class="image-item" @click="showImageDetail(image)"/>
      <div class="image-show-component image-show-footer image-hidden-item">
        <span>{{ image.fileName }}</span>
      </div>
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
  methods: {
    // 生成图片外链
    uploadOssPublic(file) {
      this.$api.coreImage.uploadOcrImage(file.id).then(() => {
        this.$message.success('图片外链生成成功');
      }).catch(() => {
        this.$message.error('图片外链生成失败');
      })
    },
    // 删除OCR图片
    deleteOcrImage(image) {
      let id = image.id;
      let name = image.fileName;
      this.$confirm(`即将删除图片 ${name}, 此操作无法恢复, 是否继续`, '请确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.coreImage.deleteImage(id).then(() => {
          this.$message.success('图片删除成功');
          this.search();
        }).catch(() => {
          this.$message.error('删除失败, 请稍后重试');
        })
      });
    },
  },
  props: ['search', 'image', 'showImageDetail'],
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

#image-show-box:hover {
  cursor: pointer;
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

.image-show-component span {
  font-size: .8rem;
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
}

.image-show-footer span {
  width: 100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>