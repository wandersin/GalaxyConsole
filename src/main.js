import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "@/script/router";
import commonUtils from "@/script/common-utils";
import moment from "moment";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

Vue.prototype.$commonUtils = commonUtils;
Vue.prototype.$axios = Axios;
Vue.prototype.$moment = moment;
Vue.prototype.$authman_baseUrl = process.env.VUE_APP_AUTH_MAN_BASEURL;

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app');
