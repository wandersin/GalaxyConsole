<template>
  <div id="login-page-root">
    <div id="login-input">
      <login/>
    </div>
  </div>
</template>

<script>
import Login from "@/components/base/Login";

export default {
  name: "LoginPage",
  components: {Login}
}
</script>

<style scoped>
#login-input {
  width: 25%;
  height: 50%;
  border: 1px solid black;
  position: absolute;
  padding: 1rem;
  top: 25%;
  right: 10%;
}
</style>
