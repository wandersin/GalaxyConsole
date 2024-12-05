import coreService from "@/utils/core-service";

const videoApi = {
    search: (searchParam) => coreService({
        url: `/video/search`,
        method: 'get',
        params: searchParam
    })
}

export default videoApi
