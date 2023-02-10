import router from "@/script/router";
import Vue from "vue";

const Interceptors = {
    headersHandler: function (config) {
        let token = localStorage.getItem('xAuthToken');
        if (token) {
            config.headers['X-Auth-Token'] = token;
        }
        config.headers['Archimedes-Active'] = Vue.prototype.$archimedes_active;
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
            localStorage.removeItem('xAuthToken');
            router.push({path: '/login'});
        }
    }
}

export default Interceptors
