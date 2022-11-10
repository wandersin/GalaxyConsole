<template>
  <div id="register-root">
    <div id="register-input">
      <register/>
    </div>
  </div>
</template>

<script>
import Register from "@/components/base/Register";

export default {
  name: "RegisterPage",
  components: {Register}
}
</script>

<style scoped>
#register-input {
  width: 30%;
  height: 70%;
  border: 1px solid black;
  position: absolute;
  top: 15%;
  left: 35%;
}
</style>
