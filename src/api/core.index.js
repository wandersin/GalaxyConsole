import coreService from "@/utils/core-service";

const indexApi = {
    listMenu: () => coreService({
        url: `/index/left-menu/list`,
        method: 'get'
    })
}

export default indexApi
