<template>
  <div>
    <el-row>
      <div id="user-box" @click="showPanel">
        <el-image class="portrait" :src="src" fit="fill"/>
        <div id="user-panel" v-show="panelFlag">
          <div id="user-handler-panel">
            <div id="user-handler-panel-body">

            </div>
            <div id="user-handler-panel-footer" @click="showUpdatePassword">
              <i class="el-icon-setting"></i>
              <div>修改密码</div>
            </div>
          </div>
          <div id="user-logout" @click="logout">
            <i class="el-icon-switch-button"></i>
            <div>退出登录</div>
          </div>
          <div id="user-terms">
            <!--          <div>隐私权政策 · 服务条款</div>-->
          </div>
        </div>
      </div>
    </el-row>

    <el-row id="main-header-user-operation-row">
      <el-dialog title="修改密码" :visible.sync="updatePasswordFlag" width="30%">
        <el-input class="password-input" placeholder="请输入您的新密码" v-model="newPassword1" show-password/>
        <el-input class="password-input" placeholder="请再次输入您的新密码" v-model="newPassword2" show-password/>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelUpdatePassword">取消</el-button>
          <el-button type="primary" @click="updatePassword">保存</el-button>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Header",
  data() {
    return {
      src: `${this.$auth_baseUrl}/user/portrait/${localStorage.getItem('xAuthToken')}`,
      panelFlag: false,
      updatePasswordFlag: false,
      newPassword1: '',
      newPassword2: ''
    }
  },
  methods: {
    showUpdatePassword() {
      this.updatePasswordFlag = true;
    },
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
    },
    cancelUpdatePassword() {
      this.clearPassword();
    },
    updatePassword() {
      this.$confirm(`修改密码后需要您重新登录, 是否继续`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.newPassword1 !== this.newPassword2) {
          this.$notify({
            title: '警告',
            message: '两次输入的密码不同, 请检查后重试',
            type: 'warning'
          });
          return;
        }
        this.$api.authUser.updatePassword(this.newPassword1).then(() => {
          this.$notify({
            title: '成功',
            message: '修改密码成功',
            type: 'success'
          });
          this.clearPassword();
          this.$router.push({path: '/login'}).catch(() => {});
        })
      });
    },
    clearPassword() {
      this.updatePasswordFlag = false;
      this.newPassword1 = '';
      this.newPassword2 = '';
    }
  },
  mounted() {
    // 个人信息
    this.$api.authUser.checkToken(localStorage.getItem('xAuthToken')).then(data => {
      Vue.prototype.$me = data;
    })

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
  padding-left: 1.5rem;
}

#user-logout {
  position: absolute;
  height: 2.5rem;
  width: calc(100% - 1rem);
  left: .5rem;
  top: 10rem;
  padding-left: 1.5rem;
}

#user-handler-panel-footer:hover, #user-logout:hover {
  cursor: pointer;
}

#user-handler-panel-footer i, #user-logout i {
  font-size: 1.3rem;
  line-height: 2.5rem;
  font-weight: bolder;
  float: left;
  margin: 0 .6rem;
}

#user-handler-panel-footer div, #user-logout div {
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

.password-input {
  margin-bottom: .5rem;
}
</style>
