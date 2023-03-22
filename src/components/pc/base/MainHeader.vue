<template>
  <div>
    <div id="user-box" @click="showPanel">
      <el-image class="portrait" :src="src" fit="fill"/>
      <div id="user-panel" v-show="panelFlag">
        <div id="user-handler-panel">
          <div id="user-handler-panel-body">

          </div>
          <div id="user-handler-panel-footer">
          </div>
        </div>
        <div id="user-logout" @click="logout">
          <i class="el-icon-switch-button"></i>
          <div>退出登录</div>
        </div>
        <div id="user-terms">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      src: `${this.$auth_baseUrl}/user/portrait/${localStorage.getItem('xAuthToken')}`,
      panelFlag: false
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
    hidePanel() {
      this.panelFlag = false;
    },
    showPanel() {
      this.panelFlag = true;
    }
  },
  mounted() {
    let vue = this;
    // addEventListener(event, function, useCapture);
    // useCapture: false为冒泡传递, true为捕获传递
    // 冒泡传递内部点击事件先触发, 捕获传递外部点击事件先触发
    document.addEventListener('click', () => vue.hidePanel(), true);
  }
}
</script>

<style scoped>
.portrait {
  width: calc(100vh * 0.07 * 0.60);
  height: calc(100vh * 0.07 * 0.60);
  margin: calc(100vh * 0.07 * 0.2) 0;
  padding: 0;
  border-radius: 100%;
}

.portrait:hover {
  cursor: pointer;
}

#user-box {
  float: right;
  margin: 0 4rem;
  text-align: right;
}

#user-panel {
  background-color: #eaecef;
  height: 15rem;
  width: 20rem;
  border-radius: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  position: relative;
  z-index: 9;
}

#user-handler-panel {
  background-color: white;
  height: 9.5rem;
  width: calc(100% - 1rem);
  top: .5rem;
  left: .5rem;
  position: absolute;
  border-radius: 2rem;
}

#user-handler-panel-body {
  height: 7rem;
  width: 100%;
  border-radius: 2rem 2rem 0 0;
  border-bottom: 2px solid #eaecef;
  box-sizing: border-box;
}

#user-handler-panel-footer {
  height: 2.5rem;
  width: 100%;
  border-radius: 0 0 2rem 2rem;
}

#user-logout {
  position: absolute;
  height: 2.5rem;
  width: calc(100% - 1rem);
  left: .5rem;
  top: 10rem;
}

#user-logout:hover {
  cursor: pointer;
}

#user-logout i {
  font-size: 1.5rem;
  line-height: 2.5rem;
  font-weight: bolder;
  float: left;
  margin: 0 .5rem;
}

#user-logout div {
  font-size: 1.1rem;
  line-height: 2.5rem;
  float: left;
  margin: 0 2rem;
}

#user-terms {
  position: absolute;
  height: 2.5rem;
  width: 100%;
  top: 12.5rem;
  border-radius: 0 0 2rem 2rem;
  border-top: 1px solid lightgray;
  box-sizing: border-box;
}
</style>
