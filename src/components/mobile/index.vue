<template>
  <div>
    <h3>index</h3>
    <el-button type="primary" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    logout() {
      let token = localStorage.getItem('xAuthToken');
      if (token) {
        this.$api.authUser.logout(token).then(() => {
          localStorage.removeItem('xAuthToken');
          this.$router.push({path: '/login'}).catch(() => {});
        });
      }
    }
  }
}
</script>

<style scoped>

</style>