import coreService from "@/utils/core-service";

const imageApi = {
    search: (searchParam) => coreService({
        url: `/image/search/word`,
        method: 'get',
        params: searchParam
    }),
    listOssPublicImage: (num, type) => coreService({
        url: `/oss/list?num=${num}&type=${type}`,
        method: 'get'
    }),
    uploadOcrImage: (id) => coreService({
        url: `/oss/image/upload/${id}`,
        method: 'post'
    }),
    deleteImage: (id) => coreService({
        url: `/image/${id}`,
        method: 'delete'
    })
}

export default imageApi
