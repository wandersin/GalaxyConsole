import authService from "@/utils/auth-service";

const userApi = {
    login: (user) => authService({
        url: '/user/login',
        method: 'post',
        data: user
    }),
    emailCode: (email, operation) => authService({
        url: `/user/email-code?email=${email}&operation=${operation}`,
        method: 'get'
    }),
    register: (user, code) => authService({
        url: `/user/register?code=${code}`,
        method: 'post',
        data: user
    }),
    logout: (token) => authService({
        url: `/user/logout/${token}`,
        method: 'post'
    }),
    info: () => authService({
        url: `/user/info`,
        method: 'get'
    }),
    list: (arr) => authService({
        url: `/user/list`,
        method: 'get',
        data: arr
    }),
    group: (uid) => authService({
        url: `/user/${uid}/group`,
        method: 'get'
    }),
    permission: (uid) => authService({
        url: `/user/${uid}/permission`,
        method: 'get'
    }),
    resetPasswd: (uid) => authService({
        url: `/user/${uid}/password/reset`,
        method: 'post'
    }),
    updatePassword: (password) => authService({
        url: `/user/password/update`,
        method: 'post',
        headers: {
            'Content-Type': 'text/plain'
        },
        data: password
    })
}

export default userApi
