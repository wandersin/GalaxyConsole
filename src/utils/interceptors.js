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
            return response.data;
        }
    }
}

export default Interceptors
