<template>
  <div id="register-root">
    <input type="text" placeholder="邮箱"><br>
    <input type="text" placeholder="用户名"><br>
    <input type="password" placeholder="请输入密码"><br>
    <input type="password" placeholder="请再次输入密码"><br>
    <input type="text" placeholder="请输入验证码">
    <button>发送验证码</button>
    <br>
    <button @click="register">注册</button>
    <button @click="toLoginPage">已有账号，去登录</button>
  </div>
</template>

<script>
export default {
  name: "Register",
  methods: {
    register() {
      this.$router.push({path: '/index'});
    },
    toLoginPage() {
      this.$router.push({path: '/login'});
    }
  }
}
</script>

<style scoped>

</style>
