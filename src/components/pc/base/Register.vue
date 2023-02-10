<template>
  <div id="register-root">
    <input type="text" v-model="user.email" placeholder="邮箱"><br>
    <input type="text" v-model="user.username" placeholder="用户名"><br>
    <input type="password" v-model="user.password" placeholder="请输入密码"><br>
    <input type="password" v-model="password" placeholder="请再次输入密码"><br>
    <input type="text" v-model="code" placeholder="请输入验证码">
    <button @click="sendVerificationCode">发送验证码</button>
    <br>
    <button @click="register">注册</button>
    <button @click="toLoginPage">已有账号，去登录</button>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        username: '',
        password: '',
        email: ''
      },
      password: '',
      code: ''
    }
  },
  methods: {
    verify() {
      if (this.$commonUtils.isEmpty(this.user.username) || this.$commonUtils.isEmpty(this.user.password) || this.$commonUtils.isEmpty(this.user.email)) {
        return false;
      }
      if (this.user.password !== this.password) {
        return false;
      }
    },
    sendVerificationCode() {
      if (this.verify() === false) {
        return;
      }
      this.$api.authUser.emailCode(this.user.email, 'register').then(() => {
        alert("验证码发送成功");
      });
    },
    register() {
      if (this.verify() === false) {
        return;
      }
      this.$api.authUser.register(this.user, this.code).then(token => {
        localStorage.setItem('xAuthToken', token);
        // 注册成功跳转到首页
        this.$router.push({path: '/index'});
      })
    },
    toLoginPage() {
      this.$router.push({path: '/login'});
    }
  }
}
</script>

<style scoped>

</style>
