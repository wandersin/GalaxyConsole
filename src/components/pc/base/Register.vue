<template>
  <div id="register-root">
    <h1>注册</h1>
    <el-input placeholder="邮箱" v-model="user.email" clearable></el-input>
    <el-input placeholder="用户名" v-model="user.username" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-input placeholder="请输入验证码" v-model="code">
      <el-button slot="append" @click="sendVerificationCode">发送验证码</el-button>
    </el-input>
    <br>
    <el-button slot="append" @click="register">注册</el-button>
    <div id="link-box">
      <el-link type="info" id="to-register-btn" @click="flip">已有账号，去登录</el-link><br>
    </div>
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
      this.$api.authUser.emailCode(this.user.email, 'USER_REGISTER').then(() => {
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
        this.$router.push({path: '/index'}).catch(() => {});
      })
    },
    flip() {
      this.$emit('flipInputBox');
    }
  }
}
</script>

<style scoped>
h1 {
  color: #057feb;
}

.el-input {
  margin: .5rem 0;
}

#link-box {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
}
</style>
