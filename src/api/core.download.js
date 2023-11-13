import coreService from "@/utils/core-service";

const downloadApi = {
    search: (keyWord, page) => coreService({
        url: `/download/search?name=${keyWord}&page=${page}`,
        method: 'get'
    }),
    download: (id) => coreService({
        url: `/download/pt/${id}`,
        method: 'post'
    }),
    task: () => coreService({
        url: `/download/task?additional=detail&additional=transfer`,
        method: 'get'
    })
}

export default downloadApi
