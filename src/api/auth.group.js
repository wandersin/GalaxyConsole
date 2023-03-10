import authService from "@/utils/auth-service";

const groupApi = {
    list: (arr) => authService({
        url: `/group/list`,
        method: 'get',
        data: arr
    }),
    updateGroupUser: (group, uid) => authService({
        url: `/group/${group}/user`,
        method: 'post',
        data: uid
    })
}

export default groupApi
