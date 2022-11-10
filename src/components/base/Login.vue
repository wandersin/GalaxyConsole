<template>
  <div>
    <input type="text" v-model="user.name" placeholder="用户名"><br>
    <input type="text" v-model="user.email" placeholder="邮箱"><br>
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
        email: ''
      }
    }
  },
  methods: {
    login() {
      this.$router.push({path: '/index'});
    },
    toRegisterPage() {
      this.$router.push({path: '/register'});
    }
  }
}
</script>

<style scoped>

</style>
