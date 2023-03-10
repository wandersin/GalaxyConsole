import authService from "@/utils/auth-service";

const groupApi = {
    list: (arr) => authService({
        url: `/group/list`,
        method: 'get',
        data: arr
    }),
    delete: (id) => authService({
        url: `/group/${id}`,
        method: 'delete'
    }),
    updateGroupUser: (group, uid) => authService({
        url: `/group/${group}/user`,
        method: 'post',
        data: uid
    }),
    createGroup: (group) => authService({
        url: `/group/create`,
        method: 'put',
        data: group
    })
}

export default groupApi
