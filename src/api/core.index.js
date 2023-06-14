import coreService from "@/utils/core-service";

const indexApi = {
    listMenu: (support) => coreService({
        url: `/index/left-menu/list?support=${support}`,
        method: 'get'
    })
}

export default indexApi
