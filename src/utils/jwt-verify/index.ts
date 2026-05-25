/**
 * 解析 jwt 令牌用户信息
 */
import { jwtDecode } from 'jwt-decode'
interface JwtPayload {
    sub?: string // 用户ID
    userId: number // 用户ID字段
    username: string    // 用户名
    exp?: number // 过期时间
    iat?: number // 签发时间
    [key: string]: any; // 其他自定义字段
}
export function jwtVerify(token: string): JwtPayload {
    // 解码 JWT token获取用户 ID
    const decodedToken: JwtPayload = jwtDecode(token)
    // 检查用户Id和角色是否存在
    if (!decodedToken.userId && !decodedToken.role) {
        throw new Error('登录凭证无效 - 缺少用户标识')
    }

    return {
        userId: decodedToken.userId,
        username: decodedToken.username
    }
}