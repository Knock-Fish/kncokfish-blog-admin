import request from "@/utils/http"
export class AuthService{
    // 登录
    static login(data: Api.Auth.LoginParams){
        return request.post<Api.Auth.LoginResponse>({
            url: '/api/auth/login',
            data
        })
    }
}