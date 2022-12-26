<template>
  <div id="login-page-root">
    <div id="login-input">
      <login/>
    </div>
    <div id="login-page-bkg">
      <el-image style="width: 100%; height: 100%;" :src="src" :fit="fit"/>
    </div>
  </div>
</template>

<script>
import Login from "@/components/base/Login";
import img from '@/images/login.jpg';

export default {
  name: "LoginPage",
  data() {
    return {
      src: img,
      fit: 'cover'
    }
  },
  components: {Login}
}
</script>

<style scoped>
#login-input {
  width: 20%;
  height: 50%;
  border: 1px solid black;
  position: absolute;
  padding: 1rem;
  top: 25%;
  right: 20%;
  background-color: white;
  border-radius: 1rem;
}

#login-page-bkg {
  background-color: lightblue;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
