<template>
  <div id="group-manager-root-panel">
    <el-row id="group-controller-row">
      <el-button class="inline-btn" @click="refreshGroup">刷新</el-button>
      <el-button class="inline-btn" @click="create.show = !create.show">新建群组</el-button>
      <transition v-show="create.show" name="el-zoom-in-center">
        <div v-show="create.show">
          <el-input style="margin-left: 10px;" class="inline-input" v-model="create.groupName" placeholder="名称"/>
          <el-input class="inline-input" v-model="create.desc" placeholder="备注"/>
          <el-button class="inline-btn" type="danger" plain @click="clearCreateInput">取消</el-button>
          <el-button style="margin: 0;" class="inline-btn" type="primary" plain @click="createGroup">保存</el-button>
        </div>
      </transition>
    </el-row>
    <el-row id="group-row">
      <el-table v-loading="group.loading" :data="group.list" border>
        <el-table-column type="selection" fixed/>
        <el-table-column prop="id" label="id" width="350"/>
        <el-table-column prop="groupName" label="群组名" width="300"/>
        <el-table-column label="用户数" sortable width="100">
          <template slot-scope="scope">
            <el-link type="primary" @click="editGroupUser(scope.row.id)">{{ scope.row.users.length }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="备注"/>
        <el-table-column label="创建时间" sortable width="110">
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
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editGroupRole(scope.row.id)">角色管理</el-button>
<!--            <el-button type="text" size="small">编辑</el-button>-->
            <el-button type="text" size="small" @click="deleteGroup(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row id="group-operation-row">
      <!-- 用户编辑 -->
      <el-dialog title="群组用户编辑" :visible.sync="edit.user.editGroupUserFlag" class="dialog-panel" width="40rem">
        <el-transfer class="transfer-panel" v-model="edit.user.withinGroup" :data="edit.user.userData" :titles="['其他用户', '组内用户']"/>
        <div slot="footer" class="dialog-footer">
          <el-button @click="edit.user.editGroupUserFlag = false">取消</el-button>
          <el-button type="primary" @click="updateGroupUser">保存</el-button>
        </div>
      </el-dialog>
      <!-- 角色编辑 -->
      <el-dialog title="群组角色编辑" :visible.sync="edit.role.editGroupRoleFlag" class="dialog-panel" width="40rem">
        <el-transfer class="transfer-panel" v-model="edit.role.withinGroup" :data="edit.role.roleData" :titles="['其他角色', '已关联角色']"/>
        <div slot="footer" class="dialog-footer">
          <el-button @click="edit.role.editGroupRoleFlag = false">取消</el-button>
          <el-button type="primary" @click="updateGroupRole">保存</el-button>
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
      group: {
        loading: false,
        list: [],
      },
      edit: {
        currentGroup: '',
        user: {
          editGroupUserFlag: false,
          userData: [],
          withinGroup: [],
        },
        role: {
          editGroupRoleFlag: false,
          roleData: [],
          withinGroup: [],
        }
      },
      create: {
        show: false,
        groupName: '',
        desc: ''
      }
    }
  },
  methods: {
    refreshGroup() {
      this.group.loading = true;
      this.group.list = [];
      this.$api.authGroup.list().then(data => {
        this.group.list = data;
        this.group.loading = false;
      }).catch(() => {
        this.group.loading = false;
      })
    },
    editGroupUser(id) {
      this.edit.user.editGroupUserFlag = true;
      this.edit.currentGroup = id;
      this.edit.user.userData = [];
      this.edit.user.withinGroup = [];
      this.$api.authUser.list().then(data => {
        data.forEach(user => {
          this.addUserData(user);
        })
      });
      this.$api.authGroup.get(id).then(data => {
        let users = data.users;
        users.forEach(user => {
          this.edit.user.withinGroup.push(user);
        })
      })
    },
    editGroupRole(id) {
      this.edit.currentGroup = id;
      this.edit.role.editGroupRoleFlag = true;
      this.edit.role.roleData = [];
      this.edit.role.withinGroup = [];
      this.$api.authRole.list().then(data => {
        data.forEach(role => {
          this.addRoleData(role);
        })
      });
      this.$api.authGroup.listGroupRole(id).then(data => {
        data.forEach(role => {
          this.edit.role.withinGroup.push(role.id);
        })
      })
    },
    addUserData(user) {
      let tmp = {
        key: user.id,
        label: user.username
      }
      this.edit.user.userData.push(tmp)
    },
    addRoleData(role) {
      let tmp = {
        key: role.id,
        label: role.roleName
      }
      this.edit.role.roleData.push(tmp)
    },
    updateGroupUser() {
      this.$api.authGroup.updateGroupUser(this.edit.currentGroup, this.edit.user.withinGroup).then(() => {
        this.edit.user.editGroupUserFlag = false;
        this.$message.success('更新成功');
        this.refreshGroup();
      }).catch(() => {
        this.$message.error('更新失败');
      })
    },
    updateGroupRole() {
      this.$api.authGroup.updateGroupRole(this.edit.currentGroup, this.edit.role.withinGroup).then(() => {
        this.edit.role.editGroupRoleFlag = false;
        this.$message.success('更新成功');
        this.refreshGroup();
      }).catch(() => {
        this.$message.error('更新失败');
      })
    },
    clearCreateInput() {
      this.create.groupName = '';
      this.create.desc = '';
      this.create.show = false;
    },
    createGroup() {
      if (this.$commonUtils.isEmpty(this.create.groupName)) {
        this.$message.error('信息有误, 请检查后重试');
      }
      this.$api.authGroup.createGroup(this.create).then(() => {
        this.$message.success('群组创建成功');
        this.clearCreateInput();
        this.refreshGroup();
      }).catch(() => {
        this.$message.error('创建失败, 请稍后重试');
      })
    },
    deleteGroup(id) {
      this.$confirm('此操作将删除该群组且无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.authGroup.delete(id).then(() => {
          this.$message.success('群组删除成功');
          this.refreshGroup();
        }).catch(() => {
          this.$message.error('删除失败, 请稍后重试');
        })
      });
    }
  },
  mounted() {
    this.refreshGroup();
  }
}
</script>

<style scoped>
#group-controller-row {
  margin-bottom: .5rem;
}

.inline-btn {
  float: left;
}

.inline-input {
  float: left;
  width: 15rem;
}

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