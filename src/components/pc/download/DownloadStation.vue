<template>
  <div id="download-station-root">
    <el-row id="download-controller-row">
      <el-col :span="4">
        <el-input v-model="searchKey" placeholder="请输入关键词进行搜索" @keydown.enter.native="search(searchKey, currentPage)"></el-input>
      </el-col>
      <el-col :span="1">
        <el-button @click="search(searchKey, currentPage)">搜索</el-button>
      </el-col>
      <el-col v-if="searchResult.torrent.length !== 0" :span="1">
        <el-button class="btn" @click="download">下载</el-button>
      </el-col>
      <el-col v-if="searchResult.torrent.length !== 0" :span="1">
        <el-button class="btn" @click="refresh">刷新</el-button>
      </el-col>
    </el-row>
    <el-row id="download-torrent-row">
      <el-table v-loading="searchFlag" :data="searchResult.torrent" :height="tableHeight" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" fixed/>
        <el-table-column prop="id" label="id" width="80"/>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <div class="title">{{ scope.row.title }}</div>
            <div class="subtitle">{{ scope.row.subtitle }}</div>
            <el-progress v-if="scope.row.percentage !== 0" :percentage="scope.row.percentage" :format="percentageFormat"/>
            <el-tag v-if="scope.row.percentage === 100" size="mini" class="pt-tag" type="success" effect="plain">做种中</el-tag>
            <el-tag v-else-if="scope.row.percentage !== 0" size="mini" class="pt-tag" effect="plain">下载中</el-tag>
            <el-tag v-else-if="scope.row.downloaded" size="mini" class="pt-tag" type="success" effect="plain">已完成</el-tag>
            <el-tag v-else size="mini" class="pt-tag" type="info" effect="plain">未下载</el-tag>
            <el-tag v-for="item in scope.row.tagList" size="mini" class="pt-tag" type="warning" effect="plain" :key="item">
              {{ item }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="size" label="文件大小" width="100"/>
        <el-table-column label="发布日期" sortable width="110">
          <template slot-scope="scope">
            <div class="release-date">
              {{ scope.row.date | dataFormat('YYYY-MM-DD') }}
              <br>
              {{ scope.row.date | dataFormat('hh:mm:ss') }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="uploading" label="正在做种" sortable width="110"/>
        <el-table-column prop="downloading" label="正在下载" sortable width="110"/>
        <el-table-column prop="completed" label="已下载" sortable width="100"/>
        <el-table-column prop="announcer" label="发布者" width="120"/>
      </el-table>
    </el-row>
    <el-row id="download-page-row">
      <el-pagination hide-on-single-page background layout="prev, pager, next" :page-count="searchResult.page" :current-page="currentPage" @current-change="handleCurrentChange"/>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DownloadStation",
  data() {
    return {
      tableHeight: 0,
      searchKey: '',
      searchResult: {
        page: 1,
        torrent: [
        ],
      },
      currentPage: 1,
      selection: [],
      searchFlag: false,
      downloadFlag: false
    }
  },
  methods: {
    search(name, page) {
      if (this.$commonUtils.isEmpty(name)) {
        alert("关键词不能为空");
        return;
      }
      if (this.searchFlag === true) {
        this.$notify({
          title: '警告',
          message: '请勿重复点击',
          type: 'warning'
        });
        return;
      } else {
        this.searchFlag = true;
      }
      this.$api.coreDownload.search(name, page).then(data => {
        this.searchResult.page = data.page;
        this.searchResult.torrent = [];
        let tmpList = data.torrent;
        for (let i = 0; i < tmpList.length; i++) {
          this.searchResult.torrent.push(tmpList[i]);
        }
        this.searchFlag = false;
      })
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.search(this.searchKey, this.currentPage);
    },
    handleSelectionChange(val) {
      this.selection = [];
      for (let i = 0; i < val.length; i++) {
        this.selection.push(val[i].id);
      }
    },
    download() {
      if (this.downloadFlag === true) {
        this.$notify({
          title: '警告',
          message: '请勿重复点击',
          type: 'warning'
        });
        return;
      } else {
        this.downloadFlag = true;
      }
      this.selection.forEach(id => {
        this.$api.coreDownload.download(id).then(() => {
          this.$message({
            message: `添加下载任务成功: ${id}`,
            type: 'success'
          });
          this.downloadFlag = false;
        })
      });
      this.selection = [];
    },
    refresh() {
      this.search(this.searchKey, this.currentPage);
    },
    percentageFormat(percentage) {
      return percentage === 100 ? '完成' : `${percentage}%`;
    }
  },
  created() {
    // 表格高度
    this.tableHeight = window.innerHeight * 0.93 - 120;
  }
}
</script>

<style scoped>
#download-controller-row, #download-torrent-row {
  padding: .5rem;
  position: relative;
}

#download-page-row {
  margin-top: .5rem;
}

.btn {
  margin: 0 .5rem;
}

.title {
  font-weight: bolder;
  font-size: .9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}

.subtitle {
  margin: .5rem 0;
  font-size: .8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.release-date {
  text-align: center;
}

.pt-tag {
  margin: 0 3px;
}
</style>