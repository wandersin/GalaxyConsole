<template>
  <div id="login-page-root">
    <div class="input-box login-box" :class="{'is-flip-front': isFlip}">
      <login @flipInputBox="flip"/>
    </div>

    <div class="input-box register-box" :class="{'is-flip-back': isFlip}">
      <register  @flipInputBox="flip"/>
    </div>
    <div id="login-page-bkg">
      <el-image style="width: 100%; height: 100%;" :src="src" :fit="fit"/>
    </div>
  </div>
</template>

<script>
import Login from "@/components/pc/base/Login.vue";
import Register from "@/components/pc/base/Register.vue";
import img from '@/images/login.jpg';

export default {
  name: "LoginPage",
  data() {
    return {
      src: img,
      fit: 'cover',
      isFlip: false
    }
  },
  methods: {
    flip() {
      this.isFlip = !this.isFlip;
    }
  },
  components: {Register, Login}
}
</script>

<style scoped>
.input-box {
  width: 20%;
  height: 50%;
  border: 1px solid black;
  position: absolute;
  padding: 1rem;
  top: 25%;
  right: 20%;
  background-color: white;
  border-radius: 1rem;
  transition: all 1s ease-in-out 0s;
  backface-visibility: hidden;
}

.register-box {
  transform: rotateY(180deg);
}

.is-flip-front {
  transform: rotateY(180deg);
}

.is-flip-back {
  transform: rotateY(0deg);
}

#login-page-bkg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
