import authService from "@/utils/auth-service";

const groupApi = {
    get: (id) => authService({
        url: `/group/${id}`,
        method: 'get'
    }),
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
    }),
    listGroupRole: (id) => authService({
        url: `/group/${id}/role`,
        method: 'get'
    }),
    updateGroupRole: (group, role) => authService({
        url: `/group/${group}/role`,
        method: 'post',
        data: role
    })
}

export default groupApi
