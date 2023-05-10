import coreService from "@/utils/core-service";

const imageApi = {
    search: (keyWord, start, row, precision) => coreService({
        url: `/image/search/word?word=${keyWord}&start=${start}&row=${row}&precision=${precision}`,
        method: 'get'
    }),
    listOssPublicImage: (num, type) => coreService({
        url: `/oss/list?num=${num}&type=${type}`,
        method: 'get'
    }),
    uploadOcrImage: (id) => coreService({
        url: `/oss/image/upload/${id}`,
        method: 'post'
    })
}

export default imageApi
