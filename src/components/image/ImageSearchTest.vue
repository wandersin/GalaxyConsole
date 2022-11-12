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
    </el-row>
    <el-row>
      <el-col v-for="item in urlList" v-bind:key="item" :span="4" id="ocr-image-box">
        <div id="ocr-image-body">
          <el-image style="height: 10rem" :src="item" :fit="fit"></el-image>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ImageSearchTest",
  data() {
    return {
      keyWord: '*',
      imageInfo:[],
      urlList: [],
      fit: 'cover'
    }
  },
  methods: {
    search() {
      this.$commonUtils.get(`http://192.168.3.2:58080/core/image/search/word?word=${this.keyWord}`, data => {
        this.imageInfo.length = 0;
        this.urlList.length = 0;
        for (let i = 0; i < data.length; i++) {
          this.imageInfo.push(data[i]);
          this.urlList.push(`http://192.168.3.2:58080/core/image/${data[i].id}`);
        }
      })
    }
  }
}
</script>

<style scoped>
#ocr-input-row {
  padding: 1rem .5rem;
}

#ocr-image-box {
  padding: .5rem;
}

#ocr-image-body {
  border: 1px solid lightgray;
  text-align: center;
}
</style>
