import axios from "axios";
import interceptors from "@/utils/interceptors";

const coreService = axios.create({
    baseURL: process.env.VUE_APP_CORE_BASEURL,
    timeout: 10 * 1000
})

coreService.interceptors.request.use(
    config => interceptors.headersHandler(config)
)

coreService.interceptors.response.use(
    response => interceptors.responseHandler(response),
    error => interceptors.errorHandler(error)
)

export default coreService
