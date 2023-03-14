import authService from "@/utils/auth-service";

const permissionApi = {
    list: (arr) => authService({
        url: `/permission/list`,
        method: 'get',
        data: arr
    }),
}

export default permissionApi
