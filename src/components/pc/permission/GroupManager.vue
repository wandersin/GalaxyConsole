<template>
  <div id="group-manager-root-panel">
    <el-row id="group-row">
      <el-table v-loading="loading" :data="group" border>
        <el-table-column type="selection" fixed/>
        <el-table-column prop="id" label="id" width="350"/>
        <el-table-column prop="groupName" label="用户组" width="300"/>
        <el-table-column label="用户数" sortable width="100">
          <template slot-scope="scope">
            <el-link type="primary" @click="editGroupUser(scope.row.id)">{{ scope.row.users.length }}</el-link>
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
        <el-table-column fixed="right" label="操作" width="200">
          <template>
            <el-button type="text" size="small">查看权限</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row id="operation-row">
      <el-dialog title="群组用户编辑" :visible.sync="editGroupUserFlag" class="dialog-panel" width="40rem">
        <el-transfer class="transfer-panel" v-model="within" :data="userData" :titles="['其他用户', '组内用户']"/>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editGroupUserFlag = false">取消</el-button>
          <el-button type="primary" @click="updateGroupUser">保存</el-button>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "GroupManager",
  data() {
    return {
      loading: false,
      group: [],
      editGroupUserFlag: false,
      currentGroup: '',
      userData: [],
      within: [2]
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
    },
    editGroupUser(id) {
      this.editGroupUserFlag = true;
      this.currentGroup = id;
      this.$api.authUser.isUserInGroup(id).then(data => {
        this.userData = [];
        this.within = [];
        // 全量用户数据
        data.outside.forEach(user => {
          this.addUserData(user);
        })
        // 已在组中的用户
        data.within.forEach(user => {
          this.addUserData(user);
          this.within.push(user.id);
        })
      })
    },
    addUserData(user) {
      let tmp = {
        key: user.id,
        label: user.username
      }
      this.userData.push(tmp)
    },
    updateGroupUser() {
      this.$api.authGroup.updateGroupUser(this.currentGroup, this.within).then(() => {
        this.editGroupUserFlag = false;
        this.$message.success('更新成功');
        this.refreshGroup();
      }).catch(() => {
        this.$message.error('更新失败');
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

.dialog-panel {
  text-align: center;
}

.transfer-panel {
  text-align: left;
  display: inline-block;
}
</style>