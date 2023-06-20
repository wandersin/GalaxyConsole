import axios from "axios";
import interceptors from "@/utils/interceptors";

const prophetService = axios.create({
    baseURL: process.env.VUE_APP_PROPHET_BASEURL,
    timeout: 10 * 1000
})

prophetService.interceptors.request.use(
    config => interceptors.headersHandler(config)
)

prophetService.interceptors.response.use(
    response => interceptors.responseHandler(response),
    error => interceptors.errorHandler(error)
)

export default prophetService
