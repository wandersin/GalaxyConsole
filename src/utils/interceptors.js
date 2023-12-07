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
        // 所有前端请求添加时间戳
        config.params = {
            "_": commonUtils.getTimestamp()
        };
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
        if (error.response.status === 403) { // 登录超时
            Vue.prototype.$message.error('登录超时，请重新登录');
            localStorage.removeItem('xAuthToken');
            router.push({path: '/login'}).catch(() => {});
        } else if (error.response.status === 401) { // 权限不足
            Vue.prototype.$message.error('操作权限不足，请联系管理员添加权限');
        } else {
            Vue.prototype.$message.error(error);
        }
    }
}

export default Interceptors
