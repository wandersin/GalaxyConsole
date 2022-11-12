<template>
  <div>
    <div id="welcome-root">welcome</div>
    <div>
      <div class="block">
        <span class="demonstration">默认</span>
        <el-image :src="src"></el-image>
      </div>
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
      src: '',
      username: '',
      email: '',
    }
  },
  methods: {
    getEmailVerificationCode() {
    }
  }
}
</script>

<style scoped>

</style>
