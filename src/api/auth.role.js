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
    })
}

export default roleApi
