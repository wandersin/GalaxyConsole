<template>
  <div>
    <input type="text">
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login() {
      this.$router.push({path: '/index'});
    }
  }
}
</script>

<style scoped>

</style>
