import coreService from "@/utils/core-service";

const imageApi = {
    listMenu: () => coreService({
        url: `/index/left-menu/list`,
        method: 'get'
    })
}

export default imageApi
