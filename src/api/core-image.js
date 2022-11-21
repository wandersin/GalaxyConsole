import coreService from "@/utils/core-service";

const imageApi = {
    search: (keyWord, searchRow) => coreService({
        url: `/image/search/word?word=${keyWord}&row=${searchRow}`,
        method: 'get'
    })
}

export default imageApi
