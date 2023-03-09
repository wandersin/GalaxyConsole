<template>
  <div id="user-manager-root-panel">
    <el-row id="user-row">
      <el-table v-loading="loading" :data="user" border>
        <el-table-column type="selection" fixed/>
        <el-table-column prop="id" label="uid" width="300"/>
        <el-table-column prop="username" label="用户名" width="150"/>
        <el-table-column prop="email" label="邮箱" width="250"/>
        <el-table-column prop="status" label="状态" width="100"/>
        <el-table-column prop="portrait" label="头像"/>
        <el-table-column label="最后登录" sortable width="110">
          <template slot-scope="scope">
            <div class="table-time">
              {{ scope.row.lastLoginTime | dataFormat('YYYY-MM-DD') }}
              <br>
              {{ scope.row.lastLoginTime | dataFormat('hh:mm:ss') }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" sortable width="110">
          <template slot-scope="scope">
            <div class="table-time">
              {{ scope.row.createdTime | dataFormat('YYYY-MM-DD') }}
              <br>
              {{ scope.row.createdTime | dataFormat('hh:mm:ss') }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="最后修改" sortable width="110">
          <template slot-scope="scope">
            <div class="table-time">
              {{ scope.row.updatedTime | dataFormat('YYYY-MM-DD') }}
              <br>
              {{ scope.row.updatedTime | dataFormat('hh:mm:ss') }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserManager",
  data() {
    return {
      loading: false,
      user: []
    }
  },
  methods: {
    refreshUser() {
      this.loading = true;
      this.user = [];
      this.$api.authUser.list().then(data => {
        this.user = data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    }
  },
  mounted() {
    this.refreshUser();
  }
}
</script>

<style scoped>
.table-time {
  text-align: center;
}
</style>