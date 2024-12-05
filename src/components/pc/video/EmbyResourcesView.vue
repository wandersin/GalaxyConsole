<template>
  <div class="emby-resources-view">
    <el-row class="emby-resources-operation-row">
      <el-col :span="4">
        <el-input v-model="query.name" placeholder="请输入名称进行搜索" @keydown.enter.native="search()"></el-input>
      </el-col>
      <el-col :span="1">
        <el-button @click="search()" plain>搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="emby-resources-tb-row">
      <el-table :data="result.list" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="internal_name" label="名称" width="250"></el-table-column>
        <el-table-column prop="overview" label="简介"></el-table-column>
        <el-table-column label="封面图" width="150">
          <template slot-scope="scope">
            <div class="emby-resources-image-box">
              <el-image :src="getImageUrl(scope.row.image)" fit="contain" style="width: 100px;"/>
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
        <el-table-column prop="adult" label="成人内容" width="50" :formatter="formatAdult"></el-table-column>
        <el-table-column prop="type" label="类型" width="100"></el-table-column>
        <el-table-column label="分辨率" width="100">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.resolution_name" :key="item" type="success" size="small" effect="plain" style="margin: .3rem;">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="notice" label="邮件通知" width="50" :formatter="formatNotice"></el-table-column>
        <el-table-column label="加入时间" width="110">
          <template slot-scope="scope">
            <div class="table-time">
              {{ scope.row.created_time | dataFormat('YYYY-MM-DD') }}
            </div>
          </template>
        </el-table-column>
      </el-table>
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
        size: 10
      },
      result: {
        total:0,
        list: []
      },
      filters: {

      }
    }
  },
  methods: {
    // 搜索
    search() {
      this.$api.coreVideo.search(this.query).then(data => {
        this.result = data
      })
    },
    getImageUrl(path) {
      let url = `${this.$emby_resources_image_endpoint}/t/p/w200${path}`;
      console.log(url);
      return url;
    },
    formatBoolean(value) {
      return value === true ? '是' : '否';
    },
    formatAdult(row) {
      return this.formatBoolean(row.adult);
    },
    formatNotice(row) {
      return this.formatBoolean(row.notice);
    }
  },
  created() {
    this.search();
  }
}
</script>

<style scoped>
.emby-resources-operation-row {
  padding: .5rem 0;
  position: relative;
}

.emby-resources-image-box {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>