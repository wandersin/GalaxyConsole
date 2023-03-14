<template>
  <div id="role-manager-root-panel">
    <el-row id="role-controller-row">

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
            <el-button type="text" size="small">删除</el-button>
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
    }
  },
  mounted() {
    this.refreshRole();
  }
}
</script>

<style scoped>
.table-time {
  text-align: center;
}
</style>