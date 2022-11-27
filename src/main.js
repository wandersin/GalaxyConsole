import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "@/script/router";
import commonUtils from "@/script/common-utils";
import moment from "moment";
import api from "@/api";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

Vue.prototype.$commonUtils = commonUtils;
Vue.prototype.$axios = Axios;
Vue.prototype.$moment = moment;
Vue.prototype.$core_baseUrl = process.env.VUE_APP_CORE_BASEURL;
Vue.prototype.$archimedes_active = process.env.VUE_APP_ARCHIMEDES_ACTIVE;

Vue.prototype.$api = api;

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/register') { // 登录和注册页面直接跳转
        next();
    } else {
        commonUtils.hadLogged().then(data => {
            if (data === true) {
                next();
            } else if (from.path !== '/login') {
                router.push('/login');
            }
        });
    }
})

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app');
