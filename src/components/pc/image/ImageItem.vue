<template>
  <div id="image-show-root" v-loading="loading">
    <div id="image-show-box">
      <el-image v-show="!loading" :src="src" :fit="fit" class="image-item"/>
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
  props: ['image'],
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
  background: lightgray;
  border-radius: .5rem;
}

.image-item {
  width: 100%;
  height: 100%;
}
</style>