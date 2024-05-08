<template>
  <div id="image-ocr-root">
    <!-- 搜索框, 提示标语 -->
    <el-row id="ocr-input-row">
      <el-col :span="2">
        <el-select v-model="searchData.searchParam.type" placeholder="请选择搜索方式" class="search-item">
          <el-option
              v-for="item in searchData.searchType"
              :key="item.key"
              :label="item.key"
              :value="item.type">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input v-model="searchData.searchParam.searchKey" placeholder="请输入关键词" @keydown.enter.native="newSearch" class="search-item"></el-input>
      </el-col>
      <el-col v-if="searchData.searchParam.type === 'KEY_WORD'" :span="2">
        <el-select v-model="searchData.searchParam.precision" placeholder="请选择置信模式" class="search-item">
          <el-option
              v-for="item in searchData.searchPrecision"
              :key="item.key"
              :label="item.key"
              :value="item.precision">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button @click="newSearch" class="search-item">搜索</el-button>
      </el-col>
    </el-row>
    <!-- 小图显示 -->
    <el-row v-show="imageData.list !== null && imageData.list.length > 0">
      <div class="ocr-image-box">
        <image-item v-for="item in imageData.list" :key="item.id" :search="search" :image="item" :showImageDetail="showImageDetail"/>
      </div>
    </el-row>
    <!-- 分页页码 -->
    <el-row v-show="imageData.list !== null && imageData.list.length > 0">
      <el-pagination
          background
          @size-change="pageSizeChangeHandler"
          @current-change="pageChangeHandler"
          :current-page.sync="page.current"
          :page-sizes="page.size"
          :page-size="searchData.searchParam.row"
          layout="total, sizes, prev, pager, next"
          :total="page.numFound">
      </el-pagination>
    </el-row>
    <!-- 大图浏览, 信息展示 -->
    <el-row>
      <el-dialog :visible.sync="imageData.dialog.show" :show-close="false" class="image-dialog" width="max-content">
        <!-- 去除dialog的title部分 -->
        <div slot="title"></div>
        <el-row>
          <!-- 大图 -->
          <div class="panel-box panel-image-box">
            <el-image :src="imageData.current.src" :fit="imageData.dialog.fit" v-loading="imageData.dialog.loading"/>
          </div>
          <!-- 详情 -->
          <div class="panel-box panel-info-box">
            <el-tabs v-model="imageData.dialog.detail.tab">
              <el-tab-pane label="信息" name="info">
                <el-row class="image-dialog-info-row">
                  <i class="image-dialog-info-icon el-icon-date"></i>
                  <div class="image-dialog-info-title">
                    <span>{{ imageData.current.datetime | dataFormat('YYYY-MM-DD') }}</span>
                  </div>
                  <div class="image-dialog-info-content">
                    <span>{{ imageData.current.datetime | day() }}, {{ imageData.current.datetime | dataFormat('hh:mm') }}</span>
                  </div>
                </el-row>
                <el-row class="image-dialog-info-row">
                  <i class="image-dialog-info-icon el-icon-document"></i>
                  <el-tooltip class="item" effect="dark" :content="imageData.current.id" placement="top-start">
                    <div class="image-dialog-info-title">
                      <span>{{ imageData.current.fileName }}</span>
                    </div>
                  </el-tooltip>
                  <div class="image-dialog-info-content">
                    <span>{{ imageData.current.width }} * {{ imageData.current.height }}</span>
                  </div>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="更多" name="more">
                <json-viewer id="json-viewer" :value="imageData.current" copyable></json-viewer>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-row>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import ImageItem from "@/components/pc/image/ImageItem.vue";
import commonUtils from "@/script/common-utils";
import JsonViewer from "vue-json-viewer";

export default {
  name: "ImageSearch",
  data() {
    return {
      // 图片搜索相关参数
      searchData: {
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
        ]
      },
      imageData: {
        list: [],
        current: {},
        dialog: {
          fit: 'contain',
          detail: {
            tab: 'info'
          },
          show: false,
          loading: false
        },
      },
      page: {
        current: 1,
        numFound: 0,
        size: [12, 24, 48]
      }
    }
  },
  components: {
    JsonViewer,
    ImageItem: ImageItem
  },
  methods: {
    // 当前页发送变化
    pageChangeHandler(page) {
      this.searchData.searchParam.start = (page - 1) * this.searchData.searchParam.row;
      this.search();
    },
    // 每页显示个数变化
    pageSizeChangeHandler(size) {
      this.searchData.searchParam.row = size;
      this.searchData.searchParam.start = 0;
      this.search();
    },
    // 重新搜索关键字
    newSearch() {
      this.searchData.searchParam.start = 0;
      this.page.current = 1;
      this.search();
    },
    // 搜索, 并刷新结果
    search() {
      this.imageData.list = [];
      this.$api.coreImage.search(this.searchData.searchParam).then(data => {
        // 更新图片总数
        this.page.numFound = data.numFound;
        this.imageData.list = data.list;
      })
    },
    // 显示大图和详细信息
    showImageDetail(item) {
      this.imageData.current = item;
      this.imageData.dialog.loading = true;
      this.imageData.dialog.src = null;
      let root = this;
      // 加载图片
      this.$axios({
        method: 'get',
        url: `${this.$core_baseUrl}/image/${item.id}/binary`,
        headers: {
          'X-Auth-Token': localStorage.getItem('xAuthToken')
        },
        params: {
          quality: 'ORIGINAL',
          _: commonUtils.getTimestamp()
        },
        responseType: 'blob'
      }).then(response => {
        let reader = new FileReader();
        reader.onloadend = function() {
          // 设置图片src
          root.imageData.current.src = reader.result;
          root.imageData.dialog.loading = false;
        }
        if (response.data) {
          reader.readAsDataURL(response.data);
        }
      });
      // 最后显示详情面板
      this.imageData.dialog.show = true;
    }
  }
}
</script>

<style scoped>
#ocr-input-row {
  padding: 1rem 1rem 0 1rem;
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
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: .5rem;
  margin: 1rem;
  padding: .5rem;
  border: 1px solid lightgray;
  border-radius: .5rem;
}

.image-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-dialog /deep/ .el-dialog {
  margin: 0 !important;
  background: none;
  box-shadow: none;
}

.image-dialog /deep/ .el-dialog__header {
  padding: 0;
}

.image-dialog /deep/ .el-dialog__body {
  padding: 0;
}

.panel-box {
  height: 80vh;
  float: left;
}

.panel-info-box {
  background-color: white;
  width: 20rem;
  padding: 1rem;
  border-radius: 0 1rem 1rem 0;
  overflow: auto;
}

.panel-image-box {
  display: inline-block;
  max-width: calc(80vw - 20rem);
  background-color: black;
  border-radius: 1rem 0 0 1rem;
  padding: 1rem;
}

.panel-image-box /deep/ .el-image {
  height: 80vh;
}

.image-dialog-info-row {
  position: relative;
  width: 100%;
  height: 4rem;
  margin-top: .5rem;
}

.image-dialog-info-icon {
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  font-size: 2rem;
}

.image-dialog-info-title {
  width: calc(100% - 4rem);
  height: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.image-dialog-info-title span {
  line-height: 2rem;
  margin: 0 .5rem;
  font-size: 1.2rem;
  font-weight: bolder;
}

.image-dialog-info-content {
  width: calc(100% - 4rem);
  height: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.image-dialog-info-content span {
  line-height: 2rem;
  margin: 0 .5rem;
  font-size: 1rem;
}

.search-item {
  margin: 0 5px;
}
</style>
