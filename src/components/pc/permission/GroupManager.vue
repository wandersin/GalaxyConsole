<template>
  <div id="group-manager-root-panel">
    <el-row id="group-row">
      <el-table v-loading="loading" :data="group" border>
        <el-table-column type="selection" fixed/>
        <el-table-column prop="id" label="id" width="350"/>
        <el-table-column prop="groupName" label="用户组" width="300"/>
        <el-table-column label="用户数" width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.users.length }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="备注"/>
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
  name: "GroupManager",
  data() {
    return {
      loading: false,
      group: []
    }
  },
  methods: {
    refreshGroup() {
      this.loading = true;
      this.group = [];
      this.$api.authGroup.list().then(data => {
        this.group = data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    }
  },
  mounted() {
    this.refreshGroup();
  }
}
</script>

<style scoped>
.table-time {
  text-align: center;
}
</style>