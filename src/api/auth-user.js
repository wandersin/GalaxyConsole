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
    checkToken: (token) => authService({
        url: `/user/verification/${token}`,
        method: 'get'
    })
}

export default userApi
