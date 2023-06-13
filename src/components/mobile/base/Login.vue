<template>
  <div id="login-input-body">
    <h1>树屋</h1>
    <el-input placeholder="请输入您的用户名或邮箱" v-model="user.name" clearable></el-input>
    <el-input placeholder="请输入您的密码" v-model="user.passwd" @keydown.enter.native="login" show-password></el-input>
    <div id="login-error-msg">{{errorMsg}}</div>
    <el-button type="primary" @click="login" class="btn login-btn">登录</el-button>
    <div id="link-box">
      <el-link type="info" id="to-register-btn" @click="flip">还没有账号？去注册</el-link><br>
    </div>
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
      },
      errorMsg: '',
      showErrorMsg: false
    }
  },
  methods: {
    login() {
      let body = {
        username: this.user.name,
        email: this.user.name,
        password: this.user.passwd
      }
      if (this.$commonUtils.isEmpty(body.username) || this.$commonUtils.isEmpty(body.password)) {
        this.errorMsg = '登录信息不能为空';
        return;
      }
      this.$api.authUser.login(body).then(data => this.loginSuccess(data)).catch(() => this.loginFailed());
    },
    loginSuccess(token) {
      localStorage.setItem('xAuthToken', token);
      this.$router.push({path: '/index'}).catch(() => {});
    },
    loginFailed() {
      localStorage.removeItem('xAuthToken');
      this.errorMsg = '登录失败';
    },
    flip() {
      this.$emit('flipInputBox');
    }
  }
}
</script>

<style scoped>
#login-input-body {
  padding: 1rem;
}

h1 {
  color: #057feb;
}

.el-input {
  margin: .5rem 0;
}

#login-error-msg {
  color: red;
}

.btn {
  width: 100%;
}

.login-btn {
  margin: 3rem 0;
}

#link-box {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
}
</style>
