<template>
  <div>
    <div id="welcome-root">welcome</div>
    <!-- 注册 -->
    <div>
      <input type="text" v-model="username" placeholder="username">
      <input type="text" v-model="email" placeholder="email">
      <button @click="getEmailVerificationCode">发送验证码</button>
    </div>
  </div>

</template>

<script>
export default {
  name: "Welcome",
  components: {

  },
  data() {
    return {
      src: 'http://192.168.3.2:58082/artifactory/img/9900KF_2022-08-18_20-39-47.png',
      username: '',
      email: '',
    }
  },
  methods: {
    getEmailVerificationCode() {
      this.$commonUtils.get(`http://192.168.3.2:58080/authman/user/email-code`, data => {
        console.log(data);
      })
    }
  }
}
</script>

<style scoped>

</style>
