<template>
  <div>
    <el-image class="portrait" :src="src" fit="fill" @click="logout"/>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      src: `${this.$auth_baseUrl}/user/portrait/${localStorage.getItem('xAuthToken')}`
    }
  },
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
.portrait {
  width: calc(100vh * 0.07 * 0.80);
  height: calc(100vh * 0.07 * 0.80);
  margin: calc(100vh * 0.07 * 0.1);
  padding: 0;
  border-radius: 100%;
}

.portrait:hover {
  cursor: pointer;
}
</style>
