import prophetService from "@/utils/prophet-service";

const groupApi = {
    listParameter: (query) => prophetService({
        url: `/parameter/list`,
        method: 'get',
        params: query
    })
}

export default groupApi
