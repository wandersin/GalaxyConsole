import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "@/script/router";
import commonUtils from "@/script/common-utils";
import rsa from "@/script/rsa";
import moment from "moment";
import api from "@/api";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

Vue.prototype.$commonUtils = commonUtils;
Vue.prototype.$rsa = rsa;
Vue.prototype.$axios = Axios;
Vue.prototype.$prophet_baseUrl = process.env.VUE_APP_PROPHET_BASEURL;
Vue.prototype.$core_baseUrl = process.env.VUE_APP_CORE_BASEURL;
Vue.prototype.$auth_baseUrl = process.env.VUE_APP_AUTH_MAN_BASEURL;
Vue.prototype.$archimedes_active = process.env.VUE_APP_ARCHIMEDES_ACTIVE;
Vue.prototype.$minio_endpoint = process.env.VUE_APP_MINIO_ENDPOINT;

Vue.prototype.$me = {}; // 在MainHeader中进行赋值
Vue.prototype.$api = api;

function isMobile() {
    return navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
}

router.beforeEach((to, from, next) => {
    if (to.path.startsWith("/mobile") || to.path.startsWith('/pc')) { // 判断登录
        if (to.path === '/mobile' || to.path === '/pc') {
            next({path: '/index'});
        } else if (to.path.endsWith('/login') || to.path.endsWith('/register')) { // 登录和注册页面直接跳转
            commonUtils.hadLogged().then(data => {
                if (data === true) { // 已登录
                    next({path: '/index'});
                } else {
                    next();
                }
            });
        } else {
            commonUtils.hadLogged().then(data => {
                if (data === true) {
                    next();
                } else if (!from.path.endsWith('/login')) {
                    next({path: '/login'});
                }
            });
        }
    } else {
        let tmp = to.path === '/' ? '' : to.path;
        if (isMobile()) {
            next({path: `/mobile${tmp}`});
        } else {
            next({path: `/pc${tmp}`});
        }
    }
})

Vue.filter('dataFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern);
});

Vue.filter('day', function (dataStr) {
    let weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return weeks[moment(dataStr).day()];
});

Vue.filter('fileSizeFormat', function (size) {
    return commonUtils.fileSizeTransform(size);
});

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app');
