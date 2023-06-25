import prophetService from "@/utils/prophet-service";

const groupApi = {
    listApplication: () => prophetService({
        url: `/application/list`,
        method: 'get'
    })
}

export default groupApi
