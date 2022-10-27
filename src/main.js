import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import moment from "moment";

import commonUtils from './utils/CommonUtils.js'

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

Vue.prototype.$commonUtils = commonUtils;
Vue.prototype.$gc_baseUrl = process.env.VUE_APP_GALAXY_CONSOLE_BASEURL;
Vue.prototype.$dsp_baseUrl = process.env.VUE_APP_DYSON_SPHERE_PROGRAM_BASEURL;
Vue.prototype.$em_baseUrl = process.env.VUE_APP_ENV_MANAGER_BASEURL;
Vue.prototype.$rock_baseUrl = process.env.VUE_APP_ROCK_BASEURL;

Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

new Vue({
    render: h => h(App),
}).$mount('#app');
