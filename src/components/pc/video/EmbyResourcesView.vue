<template>
  <div class="emby-resources-view">
    <el-row class="emby-resources-tb-row">
      <el-table
          :data="result.list"
          height="75vh"
          style="width: 100%"
          @filter-change="filterHandler"
          v-loading="query.loading"
          border
      >
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="internal_name" width="250">
          <template slot="header" slot-scope="{}">
            <div class="header-cell">
              <span v-show="!filters.name.show">名称</span>
              <i v-show="!filters.name.show" class="el-icon-search header-cell-icon" @click="showNameSearch"></i>
              <el-input
                  v-show="filters.name.show"
                  placeholder="请输入内容"
                  v-model="query.name"
                  class="input-with-select"
                  size="mini"
                  @keydown.enter.native="filterByName"
                  clearable
              >
                <el-button slot="append" icon="el-icon-search" @click="filterByName"></el-button>
              </el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="overview" label="简介"></el-table-column>
        <el-table-column label="封面图" width="130">
          <template slot-scope="scope">
            <div class="emby-resources-image-box">
              <el-image :src="getImageUrl(scope.row.image)" fit="contain" style="width: 100px;"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" width="110">
          <template slot-scope="scope">
            <div class="table-time">
              {{ scope.row.release_date | dataFormat('YYYY-MM-DD') }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="adult"
            label="成人内容"
            :filters="filters.adult"
            :formatter="formatAdult"
            width="90"
            column-key="adult"
        ></el-table-column>
        <el-table-column
            prop="type"
            label="类型"
            :filters="filters.type"
            width="100"
            column-key="type"
        />
        <el-table-column label="分辨率" width="90">
          <template slot-scope="scope">
            <el-tag
                v-for="item in scope.row.resolution_name"
                :key="item"
                type="success"
                size="small"
                effect="plain"
                style="margin: .3rem;"
            >
              {{ item }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="notice"
            label="邮件通知"
            :formatter="formatNotice"
            :filters="filters.notice"
            width="90"
            column-key="notice"
        ></el-table-column>
        <el-table-column label="加入时间" width="110">
          <template slot-scope="scope">
            <div class="table-time">
              {{ scope.row.created_time | dataFormat('YYYY-MM-DD') }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="emby-resources-pagination-row">
      <el-pagination
          :current-page.sync="query.page"
          :page-sizes="rule.num"
          :page-size="query.size"
          :total="result.total"
          @size-change="pageSizeChangeHandler"
          @current-change="pageChangeHandler"
          layout="total, sizes, prev, pager, next"
          background
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EmbyResourcesView",
  data() {
    return {
      rule: {
        num: [10, 25, 50, 100]
      },
      query: {
        name: '',
        page: 1,
        size: 10,
        type: '',
        adult: '',
        loading: false,
      },
      result: {
        total:0,
        list: []
      },
      filters: {
        name: {
          show: false
        },
        type: [
          {text: 'MOVIE', value: 'MOVIE'},
          {text: 'TV', value: 'TV'},
        ],
        adult: [
          {text: '是', value: true},
          {text: '否', value: false},
        ],
        notice: [
          {text: '是', value: true},
          {text: '否', value: false},
        ]
      }
    }
  },
  methods: {
    // 搜索
    search() {
      this.query.loading = true;
      this.$api.coreVideo.search(this.query).then(data => {
        this.result = data
        this.query.loading = false;
      })
    },
    // 更新搜索条件重新搜索
    newSearch() {
      this.query.page = 1;
      this.search();
    },
    // 拼接图片链接
    getImageUrl(path) {
      return `${this.$emby_resources_image_endpoint}/t/p/w200${path}`;
    },
    // boolean值转化为 是/否
    formatBoolean(value) {
      return value === true ? '是' : '否';
    },
    // 格式化 是否包含成人内容
    formatAdult(row) {
      return this.formatBoolean(row.adult);
    },
    // 格式化 是否已发送通知
    formatNotice(row) {
      return this.formatBoolean(row.notice);
    },
    // 每页显示数量发生变化
    pageSizeChangeHandler(size) {
      this.query.size = size;
      this.search();
    },
    // 当前页发生变化
    pageChangeHandler(page) {
      this.query.page = page;
      this.search();
    },
    // 筛选
    filterHandler(filter) {
      Object.keys(filter).forEach(key => {
        this.query[key] = filter[key];
      })
    },
    // 根据名称搜索
    filterByName() {
      if (this.query.name === '') {
        this.filters.name.show = false;
      }
      this.newSearch();
    },
    // 显示名称搜索框
    showNameSearch() {
      this.filters.name.show = true;
    }
  },
  created() {
    this.search();
  }
}
</script>

<style scoped>
.emby-resources-image-box {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.emby-resources-pagination-row {
  margin: 1rem 0;
}

.header-cell {
  display: flex;
  align-items: center;
  gap: 8px;  /* 设置元素之间的间距 */
}

.header-cell-icon {
  font-size: 15px;
}

.header-cell-icon:hover {
  cursor: pointer;
}
</style>