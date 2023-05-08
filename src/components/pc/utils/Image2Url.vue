<template>
  <div id="image2url-root-body">
    <el-upload action="http://192.168.3.2:58080/core/oss/image/upload"
               list-type="picture-card"
               :headers="{'X-Auth-Token': token}"
               :on-change="handleChange"
               accept="image"
               :before-upload="beforeUpload">
      <i class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <span class="el-upload-list__item-actions">
          <el-button plain @click="showUrl(file.url)">查看外链</el-button>
        </span>
      </div>
    </el-upload>
    <el-dialog title="图片外部链接" :visible.sync="show">
      <div>{{ this.url }}</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Image2Url",
  data() {
    return {
      token: localStorage.getItem('xAuthToken'),
      show: false,
      url: ''
    }
  },
  methods: {
    beforeUpload(file) {
      let typeFlag = file.type === 'image/jpeg';
      if (!typeFlag) {
        this.$message.error("只能上次JPG格式图片");
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
    }
  }
}
</script>

<style scoped>
#image2url-root-body {
  padding: 1rem;
}
</style>