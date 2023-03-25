<template>
  <div id="user-manager-root-panel">
    <el-row id="user-controller-row">
      <el-button class="inline-btn" @click="refreshUser">刷新</el-button>
    </el-row>
    <el-row id="user-row">
      <el-table v-loading="loading" :data="user" border>
        <el-table-column type="selection" fixed/>
        <el-table-column prop="id" label="uid" width="300"/>
        <el-table-column prop="username" label="用户名" width="150"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="status" label="状态" width="100"/>
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
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="listUserPermissionTree(scope.row.id)">查看权限</el-button>
            <el-button type="text" size="small" @click="resetUserPassword(scope.row.id, scope.row.username)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row id="user-operation-row">
      <el-dialog title="用户权限查看" :visible.sync="userPermissionFlag" class="dialog-panel" width="40rem">
        <el-tree :props="treeProps" :key="currentUser" :load="loadTreeNode" lazy/>
      </el-dialog>
      <el-dialog title="重置用户密码" :visible.sync="edit.passwordFlag" width="30%">
        <div>密码重置成功, 请妥善保管新密码: {{ edit.password }}</div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserManager",
  data() {
    return {
      loading: false,
      user: [],
      userPermissionFlag: false,
      currentUser: '',
      treeProps: {
        label: 'label',
        children: 'children',
        isLeaf: 'isLeaf'
      },
      edit: {
        passwordFlag: false,
        password: ''
      }
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
    },
    listUserPermissionTree(uid) {
      this.currentUser = uid;
      this.userPermissionFlag = true;
    },
    resetUserPassword(uid, name) {
      this.$confirm(`此操作将重置用户 ${name} 的密码, 重置后该用户将退出登录, 是否继续?`, '高危动作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.authUser.resetPasswd(uid).then(data => {
          this.edit.password = data;
          this.edit.passwordFlag = true;
        })
      });
    },
    loadTreeNode(node, resolve) {
      let level = node.level;
      if (level === 0) { // group
        this.$api.authUser.group(this.currentUser).then(data => {
          let arr = [];
          data.forEach(group => {
            let tmp = {
              label: group.groupName,
              key: group.id
            }
            arr.push(tmp);
          })
          return resolve(arr);
        })
      } else if (level === 1) { // role
        this.$api.authGroup.listGroupRole(node.data.key).then(data => {
          let arr = [];
          data.forEach(role => {
            let tmp = {
              label: role.roleName,
              key: role.id
            }
            arr.push(tmp);
          })
          return resolve(arr);
        })
      } else if (level === 2) { // permission
        this.$api.authRole.listRolePermission(node.data.key).then(data => {
          let arr = [];
          data.forEach(permission => {
            let tmp = {
              label: permission.humanName,
              key: permission.systemName,
              isLeaf: true
            }
            arr.push(tmp);
          })
          return resolve(arr);
        })
      } else {
        return resolve([]);
      }
    }
  },
  mounted() {
    this.refreshUser();
  }
}
</script>

<style scoped>
#user-controller-row {
  margin-bottom: .5rem;
}

.table-time {
  text-align: center;
}

.inline-btn {
  float: left;
}
</style>