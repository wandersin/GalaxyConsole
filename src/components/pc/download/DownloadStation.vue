<template>
  <div id="download-station-root">
    <input type="text" v-model="searchKey" placeholder="请输入关键词进行搜索">
    <button @click="search(searchKey, 0)">搜索</button>
    <button @click="download">下载</button>
    <el-pagination hide-on-single-page background layout="prev, pager, next" :page-count=this.searchResult.page @current-change="handleCurrentChange"/>
    <el-table :data="searchResult.torrent" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" fixed/>
      <el-table-column prop="id" label="id" width="80"/>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <div class="title">{{ scope.row.title }}</div>
          <div class="subtitle">{{ scope.row.subtitle }}</div>
          <el-tag v-if="scope.row.downloaded" size="mini" type="info" effect="plain">已下载</el-tag>
          <el-tag v-else size="mini" effect="plain">未下载</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="文件大小" width="100"/>
      <el-table-column prop="date" label="发布日期" sortable width="170"/>
      <el-table-column prop="uploading" label="正在做种" sortable width="110"/>
      <el-table-column prop="downloading" label="正在下载" sortable width="110"/>
      <el-table-column prop="completed" label="已下载" sortable width="100"/>
      <el-table-column prop="announcer" label="发布者" width="120"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DownloadStation",
  data() {
    return {
      searchKey: '',
      searchResult: {
        page: 0,
        torrent: [],
      },
      page: 0,
      selection: []
    }
  },
  methods: {
    search(name, page) {
      if (this.$commonUtils.isEmpty(name)) {
        alert("关键词不能为空");
        return;
      }
      this.$api.coreDownload.search(name, page).then(data => {
        this.searchResult.page = data.page + 1; // 北洋园页码从0开始
        this.searchResult.torrent = [];
        let tmpList = data.torrent;
        for (let i = 0; i < tmpList.length; i++) {
          this.searchResult.torrent.push(tmpList[i]);
        }
      })
    },
    handleCurrentChange(page) {
      this.search(this.searchKey, page - 1);
    },
    handleSelectionChange(val) {
      this.selection = [];
      for (let i = 0; i < val.length; i++) {
        this.selection.push(val[i].id);
      }
    },
    download() {
      this.selection.forEach(id => {
        this.$api.coreDownload.download(id).then(() => {
          this.$message({
            message: `添加下载任务成功: ${id}`,
            type: 'success'
          });
        })
      });
      this.selection = [];
    },
  }
}
</script>

<style scoped>
.title {
  font-weight: bolder;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>