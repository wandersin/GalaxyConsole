import authService from "@/utils/auth-service";

const roleApi = {
    list: (arr) => authService({
        url: `/role/list`,
        method: 'get',
        data: arr
    }),
    info: (role) => authService({
        url: `/role/${role}`,
        method: 'get'
    }),
    updateRolePermission: (role, permissionArr) => authService({
        url: `/role/${role}/permission`,
        method: 'post',
        data: permissionArr
    }),
    createRole: (role) => authService({
        url: `/role/create`,
        method: 'put',
        data: role
    }),
    delete: (id) => authService({
        url: `/role/${id}`,
        method: 'delete'
    })
}

export default roleApi
