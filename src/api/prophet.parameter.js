import prophetService from "@/utils/prophet-service";

const groupApi = {
    getParameter: (query) => prophetService({
        url: `/parameter/get`,
        method: 'get',
        params: query
    }),
    listParameter: (query) => prophetService({
        url: `/parameter/list`,
        method: 'get',
        params: query
    }),
    listKey: () => prophetService({
        url: `/parameter/list/key/all`,
        method: 'get'
    }),
    add: (arr) => prophetService({
        url: `/parameter/add`,
        method: 'post',
        data: arr
    }),
    delete: (arr) => prophetService({
        url: `/parameter/delete`,
        method: 'delete',
        data: arr
    })
}

export default groupApi
