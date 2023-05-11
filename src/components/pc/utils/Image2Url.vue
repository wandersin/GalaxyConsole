<template>
  <div id="image2url-root-body">
    <el-upload :action="api"
               list-type="picture-card"
               :file-list="historyFile"
               :headers="{'X-Auth-Token': token}"
               :on-change="handleChange"
               accept="image"
               :before-upload="beforeUpload">
      <i class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}" style="height: 100%;">
        <el-image class="el-upload-list__item-thumbnail" :src="file.url" fit="cover"></el-image>
        <span class="el-upload-list__item-actions">
          <el-button plain @click="showUrl(file.url)">查看外链</el-button>
        </span>
      </div>
    </el-upload>
    <el-dialog title="图片外部链接" :visible.sync="show">
      <div>
        <span style="margin: 0 1rem;">{{ url }}</span>
        <el-button icon="el-icon-document-copy" size="mini" plain @click="copyImageUrl(url)"></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Image2Url",
  data() {
    return {
      api: `${this.$core_baseUrl}/oss/image/upload`,
      token: localStorage.getItem('xAuthToken'),
      show: false,
      url: '',
      historyFile: []
    }
  },
  methods: {
    beforeUpload(file) {
      let typeFlag = file.type === 'image/jpeg';
      if (!typeFlag) {
        this.$message.error("只能上传JPG格式图片");
      }
      return typeFlag;
    },
    handleChange(file) {
      // 添加文件
      if (file.status === 'ready') {
        return;
      }

      // 上传成功
      if (file.status === 'success') {
        let pattern = file.response.result;
        file.url = `${this.$minio_endpoint}/${pattern}`;
      }
    },
    showUrl(url) {
      this.url = url;
      this.show = true;
    },
    listHistoryImage() {
      let num = 20;
      let type = 'JPEG_IMAGE';
      this.$api.coreImage.listOssPublicImage(num, type).then(data => {
        data.forEach(image => {
          let file = {
            name: image.id,
            url: `${this.$minio_endpoint}/${image.objName}`
          }
          this.historyFile.unshift(file);
        })
      })
    },
    async copyImageUrl(text) {
      await navigator.clipboard.writeText(text);
      this.$message.success("图片外链已复制到剪贴板");
    }
  },
  mounted() {
    this.listHistoryImage();
  }
}
</script>

<style scoped>
#image2url-root-body {
  padding: 1rem;
}
</style>