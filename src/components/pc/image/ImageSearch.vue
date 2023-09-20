<template>
  <div id="image-ocr-root">
    <el-row id="ocr-input-row">
      <el-col :span="2">
        <el-select v-model="searchParam.type" placeholder="请选择搜索方式">
          <el-option
              v-for="item in searchType"
              :key="item.key"
              :label="item.key"
              :value="item.type">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input v-model="searchParam.searchKey" placeholder="请输入关键词" @keydown.enter.native="search"></el-input>
      </el-col>
      <el-col v-if="searchParam.type === 'KEY_WORD'" :span="2">
        <el-select v-model="searchParam.precision" placeholder="请选择置信模式">
          <el-option
              v-for="item in searchPrecision"
              :key="item.key"
              :label="item.key"
              :value="item.precision">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button @click="search">搜索</el-button>
      </el-col>
      <el-col :span="1">
        <el-tooltip class="item" effect="dark" placement="right">
          <div slot="content">
            输入要查询的文字开始搜索图片
            <br>
            搜索空或'*'可以查询所有图片
            <br>
            图片按时间倒序排列
            <br>
            点击图片可以查看大图
            <br>
            点击标签可以查看详细信息
          </div>
          <div id="ocr-point-icon-box">
            <i class="el-icon-warning-outline" id="ocr-point-icon"></i>
          </div>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="item in imageInfo" v-bind:key="item.id" :span="4" class="ocr-image-box">
        <div class="ocr-image-body">
          <div class="ocr-image-operation" @click="showImageInfo(item)">
            <i class="el-icon-info ocr-image-operation-item"></i>
            <span>{{ item.datetime | dataFormat('YYYY-MM-DD') }}</span>
          </div>
          <el-button v-if="item.fileType === 'jpeg'" id="ocr-image2url-btn" icon="el-icon-upload2" circle @click="uploadOssPublic(item)"></el-button>
          <el-image style="height: 10rem" :src="item.src" :fit="fit" lazy :previewSrcList="previewList"/>
          <div class="ocr-image-name" @click="showImageInfo(item)">{{ item.fileName }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row v-show="page.show">
      <el-pagination
          background
          @size-change="pageSizeChangeHandler"
          @current-change="pageChangeHandler"
          :page-sizes="page.size"
          :page-size="searchParam.row"
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
      searchType: [
        {key: '关键字搜索', type: 'KEY_WORD'},
        {key: '文件名搜索', type: 'FILE_NAME'},
        {key: 'id搜索', type: 'IMAGE_ID'}
      ],
      searchPrecision: [
        {key: '精确搜索', precision: 100},
        {key: '标准搜索', precision: 75},
        {key: '模糊搜索', precision: 50}
      ],
      imageInfo:[],
      fit: 'cover',
      page: {
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
      this.searchParam.start = (page - 1) * this.searchParam.row;
      this.search();
    },
    // 每页显示个数变化
    pageSizeChangeHandler(size) {
      this.searchParam.row = size;
      this.searchParam.start = 0;
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
        }
        this.createTempUrl();
        this.page.show = true;
      })
    },
    // 生成图片外链
    uploadOssPublic(file) {
      this.$api.coreImage.uploadOcrImage(file.id).then(() => {
        this.$message.success('图片外链生成成功');
      }).catch(() => {
        this.$message.error('图片外链生成失败');
      })
    },
    // tag: 通过axios携带header从后台获取图片, 生成浏览器临时路径展示
    // 从后台下载图片并缓存
    async createTempUrl() {
      for (let i = 0; i < this.imageInfo.length; i++) {
        let id = this.imageInfo[i].id;
        let { data: result } = await this.$axios.get(`${this.$core_baseUrl}/image/${id}/binary`, {
          headers: {
            'X-Auth-Token': localStorage.getItem('xAuthToken')
          },
          responseType: 'blob'
        });
        let url = window.URL.createObjectURL(result);
        this.imageInfo[i].src = url;
        this.previewList.push(url);
      }
    },
    showImageInfo(info) {
      this.detail = info;
      this.detailFlag = true;
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
  color: grey;
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

.ocr-image-body:hover .ocr-image-name, .ocr-image-body:hover .ocr-image-operation, .ocr-image-body:hover #ocr-image2url-btn {
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

#ocr-image2url-btn {
  visibility: hidden;
  position: absolute;
  top: 2.5rem;
  right: .5rem;
  z-index: 99;
}
</style>
