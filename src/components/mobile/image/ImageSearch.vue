<template>
  <div id="image-ocr-root">
    <el-row type="flex" class="header-search-row" align="middle">
      <el-input placeholder="请输入关键词" v-model="searchParam.searchKey" size="medium" class="input-with-select input-img-search" @keydown.enter.native="search">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </el-row>
    <el-row>
      <el-col v-for="item in imageInfo" v-bind:key="item.id" :span="12" class="ocr-image-box">
        <div class="ocr-image-body">
          <div class="ocr-image-operation" @click="showImageInfo(item)">
            <i class="el-icon-info ocr-image-operation-item"></i>
            <span>{{ item.datetime | dataFormat('YYYY-MM-DD') }}</span>
          </div>
          <el-button v-if="item.fileType === 'jpeg'" id="ocr-image2url-btn" icon="el-icon-upload2" circle @click="uploadOssPublic(item)"></el-button>
          <el-image style="height: 10rem" :src="getImageSrcById(item.id)" :fit="fit" lazy :previewSrcList="previewList"/>
          <div class="ocr-image-url" @click="showImageInfo(item)">{{ item.fileName }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row v-show="page.show">
      <el-pagination
          background
          @size-change="pageSizeChangeHandler"
          @current-change="pageChangeHandler"
          :page-sizes="page.size"
          :page-size="page.row"
          layout="total, sizes, prev, pager, next"
          :total="page.numFound">
      </el-pagination>
    </el-row>
    <el-row id="ocr-viewer-row">
      <el-dialog :visible.sync="detailFlag" class="dialog-panel" width="40rem">
        <div class="ocr-detail-viewer-box">
          <json-viewer id="ocr-detail-viewer" :value="detail" copyable></json-viewer>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import JsonViewer from "vue-json-viewer";

export default {
  name: "ImageSearch",
  data() {
    return {
      searchParam: {
        searchKey: '',
        start: 0,
        row: 24,
        precision: 75,
        type: 'KEY_WORD'
      },
      searchPrecision: [
        {key: '精确搜索', precision: 100},
        {key: '标准搜索', precision: 75},
        {key: '模糊搜索', precision: 50}
      ],
      imageInfo:[],
      fit: 'cover',
      page: {
        start: 0,
        row: 24,
        numFound: 0,
        size: [12, 24, 48],
        show: false
      },
      previewList: [],
      detailFlag: false,
      detail: {}
    }
  },
  components: {
    JsonViewer
  },
  methods: {
    // 当前页发送变化
    pageChangeHandler(page) {
      this.page.start = (page - 1) * this.page.row;
      this.search();
    },
    // 每页显示个数变化
    pageSizeChangeHandler(size) {
      this.page.row = size;
      this.page.start = 0;
      this.search();
    },
    // 搜索, 并刷新结果
    search() {
      this.previewList = [];
      this.imageInfo = [];
      this.$api.coreImage.search(this.searchParam).then(data => {
        this.page.numFound = data.numFound;
        let tmpList = data.list;
        for (let i = 0; i < tmpList.length; i++) {
          this.imageInfo.push(tmpList[i]);
          this.previewList.push(this.getImageSrcById(tmpList[i].id));
        }
        this.page.show = true;
      })
    },
    uploadOssPublic(file) {
      this.$api.coreImage.uploadOcrImage(file.id).then(() => {
        this.$message.success('图片外链生成成功');
      }).catch(() => {
        this.$message.error('图片外链生成失败');
      })
    },
    getImageSrcById(id) {
      let token = localStorage.getItem('xAuthToken');
      return `${this.$core_baseUrl}/image/${token}/${id}/binary`;
    },
    showImageInfo(info) {
      this.detail = info;
      this.detailFlag = true;
    }
  }
}
</script>

<style scoped>
.header-search-row {
  height: 3rem;
  margin: 0 3rem;
  z-index: 99;
}

/deep/ .el-input__inner {
  border-radius: .5rem 0 0 .5rem;
}

/deep/ .el-input-group__append {
  border-radius: 0 .5rem .5rem 0;
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

.ocr-image-body:hover .ocr-image-url, .ocr-image-body:hover .ocr-image-operation, .ocr-image-body:hover #ocr-image2url-btn {
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
  text-align: left;
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

.ocr-detail-viewer-box {
  height: 60vh;
  overflow: auto;
}

#ocr-image2url-btn {
  visibility: hidden;
  position: absolute;
  top: 2.5rem;
  right: .5rem;
  z-index: 99;
}
</style>
