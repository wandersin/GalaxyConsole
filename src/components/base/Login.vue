<template>
  <div>
    <input type="text" v-model="user.name" placeholder="请输入您的用户名或邮箱"><br>
    <input type="password" v-model="user.passwd" placeholder="请输入您的密码"><br>
    <button @click="login">登录</button>
    <button @click="toRegisterPage">注册</button>
    <button>忘记密码</button>
    <br>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        name: '',
        passwd: ''
      }
    }
  },
  methods: {
    login() {
      let body = {
        username: this.user.name,
        email: this.user.name,
        password: this.user.passwd
      }
      this.$api.authUser.login(body).then(data => this.loginSuccess(data)).catch(() => this.loginFailed());
    },
    loginSuccess(token) {
      localStorage.setItem('xAuthToken', token);
      this.$router.push({path: '/index'});
    },
    loginFailed() {

    },
    toRegisterPage() {
      this.$router.push({path: '/register'});
    }
  }
}
</script>

<style scoped>

</style>
