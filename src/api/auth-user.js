import authService from "@/utils/auth-service";

const userApi = {
    login: (user) => authService({
        url: '/user/login',
        method: 'post',
        data: user
    })
}

export default userApi
