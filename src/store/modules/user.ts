import { RoutesAlias } from '@/router/routesAlias'
import { router } from '@/router'
export const useUserStore = defineStore('userStore', () => {

    // 用户信息
    const info = ref<Partial<Api.User.UserInfo>>({})
    // 登录状态
    const isLogin = ref<boolean>(false)
    // 访问令牌
    const accessToken = ref<string>('')

    /**
     * 设置用户信息
     * @param newInfo 新的用户信息
     */
    const setUserInfo = (newInfo: Api.User.UserInfo) => {
        info.value = newInfo
    }
    /**
     * 设置登录状态
     * @param status 登录状态
     */
    const setLoginStatus = (status: boolean) => {
        isLogin.value = status
    }
    /**
     * 设置令牌
     * @param accessToken 访问令牌
     */
    const setToken = (newAccessToken: string) => {
        accessToken.value = newAccessToken
    }
    /**
     * 退出登录
     * 清空所有相关状态并跳转到登录页
     */
    const logOut = () => {
        // 清空信息
        info.value = {}
        // 重置登录状态
        isLogin.value = false
        // 清空访问令牌
        accessToken.value = ''
        // 跳转到登录页
        router.push(RoutesAlias.Login)
    }
    return {
        // 属性
        info,
        isLogin,
        accessToken,

        // 方法
        setUserInfo,
        setToken,
        setLoginStatus,
        logOut
    }

}, {
    persist: {
        key: 'fish-user',
        storage: localStorage
    }
})