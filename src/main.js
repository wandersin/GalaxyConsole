import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import moment from "moment";

import commonUtils from './utils/CommonUtils.js'
import ArrayUtils from './utils/ArrayUtils.js'

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

Vue.prototype.$commonUtils = commonUtils;
Vue.prototype.$arrayUtils = ArrayUtils;

Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

new Vue({
    render: h => h(App),
}).$mount('#app');
