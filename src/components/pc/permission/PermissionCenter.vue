<template>
  <el-tabs id="permission-root-panel" type="border-card">
    <el-tab-pane label="用户管理">
      <user-manager/>
    </el-tab-pane>
    <el-tab-pane label="用户组管理">
      <group-manager/>
    </el-tab-pane>
    <el-tab-pane label="角色管理">
      <role-manager/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import UserManager from "@/components/pc/permission/UserManager.vue";
import GroupManager from "@/components/pc/permission/GroupManager.vue";
import RoleManager from "@/components/pc/permission/RoleManager.vue";

export default {
  name: "PermissionCenter",
  components: {
    UserManager,
    GroupManager,
    RoleManager
  }
}
</script>

<style scoped>
#permission-root-panel {
  border: none;
  height: 100%;
  width: 100%;
}
</style>