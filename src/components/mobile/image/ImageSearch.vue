<template>
  <div id="image-ocr-root">
    <el-row type="flex" class="header-search-row" align="middle">
      <el-input placeholder="请输入关键词" v-model="searchParam.searchKey" size="medium" class="input-with-select input-img-search" @keydown.enter.native="search">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </el-row>
    <el-row class="image-show-row">
      <el-col v-for="item in imageInfo" v-bind:key="item.id" :span="12" class="ocr-image-box">
        <div class="ocr-image-body">
          <div class="ocr-image-operation" @click="showImageInfo(item)">
            <i class="el-icon-info ocr-image-operation-item"></i>
            <span>{{ item.datetime | dataFormat('YYYY-MM-DD') }}</span>
          </div>
          <el-image style="height: 10rem" :src="getImageSrcById(item.id)" :fit="fit" lazy :previewSrcList="previewList"/>
          <div class="ocr-image-name" @click="showImageInfo(item)">{{ item.fileName }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="pagination-row" v-show="page.show">
      <el-pagination
          background
          :pager-count="5"
          @current-change="pageChangeHandler"
          :page-size="page.row"
          layout="prev, pager, next"
          :total="page.numFound">
      </el-pagination>
    </el-row>
    <el-row id="ocr-viewer-row">
      <el-dialog :visible.sync="detailFlag" class="dialog-panel" width="90%">
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
        row: 16,
        precision: 75,
        type: 'KEY_WORD'
      },
      imageInfo:[],
      fit: 'cover',
      page: {
        start: 0,
        row: 16,
        numFound: 0,
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
    // 当前页发生变化
    pageChangeHandler(page) {
      this.page.start = (page - 1) * this.page.row;
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
  margin: 0 3.5rem;
  padding: 0 .5rem;
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

.ocr-image-body:hover .ocr-image-name, .ocr-image-body:hover .ocr-image-operation {
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

.ocr-image-name {
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

.image-show-row {
}

.pagination-row {
  margin: .5rem;
}
</style>
