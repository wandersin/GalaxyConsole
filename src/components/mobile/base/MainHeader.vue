<template>
  <div id="header-body">
    <el-row style="height: 100%;">
      <div id="menu-icon-box">
        <i class="el-icon-menu" id="left-menu-icon" @click="showDrawer"></i>
      </div>
      <div id="portrait-box" @click="logout">
        <el-image :src="src" fit="fill" class="portrait-img"/>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      src: `${this.$auth_baseUrl}/user/portrait/${localStorage.getItem('xAuthToken')}`
    }
  },
  methods: {
    logout() {
      let token = localStorage.getItem('xAuthToken');
      if (token) {
        this.$api.authUser.logout(token).then(() => {
          localStorage.removeItem('xAuthToken');
          this.$router.push({path: '/login'}).catch(() => {});
        });
      }
    },
    showDrawer() {
      this.$emit('showDrawer');
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
#header-body {
  width: 100%;
  height: 3rem;
  position: relative;
}

#left-menu-icon {
  height: 3rem;
  width: 3rem;
  line-height: 3rem;
  font-size: 1.5rem;
  color: gray;
  text-align: center;
}

#portrait-box {
  height: 3rem;
  width: 3rem;
  position: absolute;
  top: 0;
  right: .5rem;
}

#menu-icon-box {
  height: 3rem;
  width: 3rem;
  position: absolute;
  top: 0;
  left: .5rem;
}

.portrait-img {
  margin: .5rem;
  border-radius: 100%;
}
</style>
