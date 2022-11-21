<template>
  <div>
    <div>header</div>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      let token = localStorage.getItem('xAuthToken');
      if (token) {
        this.$api.authUser.logout(token).then(() => localStorage.removeItem('xAuthToken'));
      }
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped>

</style>
