<template>
  <div id="download-station-root">
    <el-row id="download-controller-row">
      <el-col :span="4">
        <el-input v-model="searchKey" placeholder="请输入关键词进行搜索" @keydown.enter.native="search(searchKey, currentPage)"></el-input>
      </el-col>
      <el-col class="btn-col" :span="1">
        <el-button @click="search(searchKey, currentPage)" plain>搜索</el-button>
      </el-col>
      <el-col class="btn-col" v-if="searchResult.torrent.length !== 0" :span="1">
        <el-button type="primary" @click="download" plain>下载</el-button>
      </el-col>
      <el-col class="btn-col" v-if="searchResult.torrent.length !== 0" :span="1">
        <el-button type="success" @click="refresh" plain>刷新</el-button>
      </el-col>
      <el-col :span="1">
        <el-tooltip class="item" effect="dark" placement="right">
          <div slot="content">输入片名关键字进行查找<br>选中要下载的影片后, 点击下载即可开始下载<br>添加任务成功后, 点击刷新即可查看下载进度</div>
          <div id="download-point-icon-box">
            <i class="el-icon-warning-outline" id="download-point-icon"></i>
          </div>
        </el-tooltip>
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
      this.searchResult.torrent = [];
      this.searchResult.page = 1;
      this.$api.coreDownload.search(name, page).then(data => { // 找到资源
        this.searchResult.page = data.page;
        let tmpList = data.torrent;
        for (let i = 0; i < tmpList.length; i++) {
          this.searchResult.torrent.push(tmpList[i]);
        }
        this.searchFlag = false;
      }).catch(() => { // 没有搜索到资源
        this.searchFlag = false;
        this.$notify({
          message: '未搜索到相关资源, 试试其他关键词吧',
          type: 'warning'
        });
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

.btn-col {
  margin-right: .5rem;
}

#download-point-icon-box {
  position: absolute;
  height: calc(100% - 1rem);
  display: flex;
  align-items: center;
}

#download-point-icon {
  font-size: 1.5rem;
  color: gray;
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