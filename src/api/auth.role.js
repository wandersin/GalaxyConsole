import authService from "@/utils/auth-service";

const roleApi = {
    list: (arr) => authService({
        url: `/role/list`,
        method: 'get',
        data: arr
    }),
}

export default roleApi
