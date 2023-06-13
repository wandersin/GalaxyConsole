<template>
  <div id="header-body">
    <el-row style="height: 100%;">
      <i class="el-icon-menu" id="left-menu-icon" @click="showDrawer"></i>
      <div id="portrait-box" @click="logout">
        <el-image :src="src" fit="fill" style="border-radius: 100%"/>
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
  height: 2rem;
  width: 2rem;
  margin: .5rem;
  float: right;
}
</style>
