import coreService from "@/utils/core-service";

const imageApi = {
    search: (keyWord, start, row, precision) => coreService({
        url: `/image/search/word?word=${keyWord}&start=${start}&row=${row}&precision=${precision}`,
        method: 'get'
    }),
}

export default imageApi
