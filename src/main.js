import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

new Vue({
  render: h => h(App),
}).$mount('#app');
