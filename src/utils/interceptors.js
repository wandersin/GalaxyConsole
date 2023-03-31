import router from "@/script/router";
import Vue from "vue";
import commonUtils from "@/script/common-utils";

const Interceptors = {
    headersHandler: function (config) {
        let token = localStorage.getItem('xAuthToken');
        if (token) {
            config.headers['X-Auth-Token'] = token;
        }
        let active = Vue.prototype.$archimedes_active;
        if (commonUtils.isNotEmpty(active)) {
            config.headers['Archimedes-Active'] = Vue.prototype.$archimedes_active;
        }
        return config;
    },
    responseHandler: function (response) {
        if (response.headers['content-type'] === 'application/octet-stream') {
            return response.data;
        }
        if (response.data.status === 'ok') {
            return response.data.result;
        } else {
            throw response.data.message;
        }
    },
    errorHandler: function (error) {
        if (error.response.status === 401) {
            Vue.prototype.$message.error('登录超时或无操作权限');
            localStorage.removeItem('xAuthToken');
            router.push({path: '/login'}).catch(() => {});
        }
    }
}

export default Interceptors
