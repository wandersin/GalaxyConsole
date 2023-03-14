<template>
  <div id="role-manager-root-panel">
    <el-row id="role-controller-row">
      <el-button class="inline-btn" @click="refreshRole">刷新</el-button>
      <el-button class="inline-btn" @click="create.show = !create.show">新建角色</el-button>
      <transition v-show="create.show" name="el-zoom-in-center">
        <div v-show="create.show">
          <el-input style="margin-left: 10px;" class="inline-input" v-model="create.roleName" placeholder="名称"/>
          <el-input class="inline-input" v-model="create.desc" placeholder="备注"/>
          <el-button class="inline-btn" type="danger" plain @click="clearCreateInput">取消</el-button>
          <el-button style="margin: 0;" class="inline-btn" type="primary" plain @click="createGroup">保存</el-button>
        </div>
      </transition>
    </el-row>
    <el-row id="role-row">
      <el-table v-loading="role.loading" :data="role.list" border>
        <el-table-column type="selection" fixed/>
        <el-table-column prop="id" label="id" width="350"/>
        <el-table-column prop="roleName" label="角色名" width="300"/>
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
            <el-button type="text" size="small" @click="editRolePermission(scope.row.id)">分配权限</el-button>
            <el-button type="text" size="small" @click="deleteRole(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row id="role-operation-row">
      <el-dialog title="权限分配" :visible.sync="edit.permission.editRolePermissionFlag" class="dialog-panel" width="40rem">
        <el-transfer class="transfer-panel" v-model="edit.permission.withinRole" :data="edit.permission.permissionData" :titles="['其他权限', '已分配权限']"/>
        <div slot="footer" class="dialog-footer">
          <el-button @click="edit.permission.editRolePermissionFlag = false">取消</el-button>
          <el-button type="primary" @click="updateRolePermission">保存</el-button>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "RoleManager",
  data() {
    return {
      role: {
        loading: false,
        list: []
      },
      edit: {
        currentRole: '',
        permission: {
          editRolePermissionFlag: false,
          permissionData: [],
          withinRole: []
        }
      },
      create: {
        show: false,
        roleName: '',
        desc: ''
      }
    }
  },
  methods: {
    refreshRole() {
      this.role.loading = true;
      this.role.list = [];
      this.$api.authRole.list().then(data => {
        this.role.list = data;
        this.role.loading = false;
      }).catch(() => {
        this.group.loading = false;
      })
    },
    clearCreateInput() {
      this.create.roleName = '';
      this.create.desc = '';
      this.create.show = false;
    },
    createGroup() {
      if (this.$commonUtils.isEmpty(this.create.roleName)) {
        this.$message.error('信息有误, 请检查后重试');
      }
      this.$api.authRole.createRole(this.create).then(() => {
        this.$message.success('角色创建成功');
        this.clearCreateInput();
        this.refreshRole();
      }).catch(() => {
        this.$message.error('创建失败, 请稍后重试');
      })
    },
    addPermissionData(data) {
      let temp = {
        key: data.id,
        label: data.humanName
      }
      this.edit.permission.permissionData.push(temp);
    },
    editRolePermission(role) {
      this.edit.permission.editRolePermissionFlag = true;
      this.edit.currentRole = role;
      this.edit.permission.permissionData = [];
      this.edit.permission.withinRole = [];
      this.$api.authPermission.list().then(data => {
        data.forEach(permission => {
          this.addPermissionData(permission);
        })
      });
      this.$api.authRole.info(role).then(data => {
        this.edit.permission.withinRole = data.permission;
      })
    },
    updateRolePermission() {
      this.$api.authRole.updateRolePermission(this.edit.currentRole, this.edit.permission.withinRole).then(() => {
        this.edit.permission.editRolePermissionFlag = false;
        this.$message.success('更新成功');
        this.refreshRole();
      }).catch(() => {
        this.$message.error('更新失败');
      })
    },
    deleteRole(id) {
      this.$confirm('此操作将删除该角色且无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.authRole.delete(id).then(() => {
          this.$message.success('角色删除成功');
          this.refreshRole();
        }).catch(() => {
          this.$message.error('删除失败, 请稍后重试');
        })
      });
    }
  },
  mounted() {
    this.refreshRole();
  }
}
</script>

<style scoped>
#role-controller-row {
  margin-bottom: .5rem;
}

.table-time {
  text-align: center;
}

.inline-btn {
  float: left;
}

.inline-input {
  float: left;
  width: 15rem;
}
</style>