import axios from "axios";
import interceptors from "@/utils/interceptors";

const authService = axios.create({
    baseURL: process.env.VUE_APP_AUTH_MAN_BASEURL,
    timeout: 10 * 1000
})

authService.interceptors.request.use(
    config => interceptors.headersHandler(config)
)

authService.interceptors.response.use(
    response => interceptors.responseHandler(response)
)

export default authService
