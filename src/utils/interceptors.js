import router from "@/script/router";

const Interceptors = {
    headersHandler: function (config) {
        let token = localStorage.getItem('xAuthToken');
        if (token) {
            config.headers['X-Auth-Token'] = token;
        }
        return config;
    },
    responseHandler: function (response) {
        let status = response.status;
        if (status === 401) {
            router.push({path: '/login'});
        } else {
            if (response.headers['content-type'] === 'application/octet-stream') {
                return response.data;
            }
            if (response.data.status === 'ok') {
                return response.data.result;
            } else {
                throw response.data.message;
            }
        }
    }
}

export default Interceptors
