import authService from "@/utils/auth-service";

const groupApi = {
    list: (arr) => authService({
        url: `/group/list`,
        method: 'get',
        data: arr
    })
}

export default groupApi
