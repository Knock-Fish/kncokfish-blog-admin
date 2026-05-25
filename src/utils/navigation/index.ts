// import type { AppRouteRecord } from '@/types/router'
// import type { MenuItem } from "@/types/store/index"
// import type { Router } from 'vue-router'
// /**
//  * 过滤路由
//  * 根据用户权限过滤可访问的路由
//  * @param router 路由实例
//  * @param role 角色
//  */
// export function filteredDynamicRoutes(routes: AppRouteRecord[], role: string) {
//   // 过滤顶层路由
//   const filteredRoutes = routes.filter(route => {
//     // 如果有子路由，先处理子路由
//     if (route.children && route.children.length > 0) {
//       // 过滤子路由，只保留当前角色有权限的
//       const filteredChildren = route.children.filter(child => {
//         return child.meta.roles?.includes(role)
//       })

//       // 如果过滤后还有子路由，更新 route.children
//       if (filteredChildren.length > 0) {
//         route.children = filteredChildren
//         return true // 保留这个父路由
//       }
//       // 如果过滤后没有子路由了，检查父路由本身是否有权限
//       else {
//         return route.meta.roles?.includes(role)
//       }
//     }
//     // 如果没有子路由，直接检查权限
//     return route.meta.roles?.includes(role)
//   }) || []
//   return filteredRoutes
// }

// /**
//  * 将路由表转换为菜单配置
//  * @param routes 路由数组
//  * @param parentPath 父级路径，用于拼接完整路径
//  * @param userRoles 用户角色，用于权限过滤
//  * @returns 菜单配置数组
//  */
// export function routesToMenu(
//   routes: AppRouteRecord[],
//   parentPath: string = '',
//   userRoles: string[] = []
// ): MenuItem[] {
//   const menus: MenuItem[] = []

//   routes.forEach((route, index) => {
//     // 检查权限
//     if (route.meta?.roles && userRoles.length > 0) {
//       const hasPermission = route.meta.roles.some(role =>
//         userRoles.includes(role)
//       )
//       if (!hasPermission) return
//     }
//     if(route.meta?.hidden){
//       return
//     }

//     // 构建完整路径
//     const fullPath = parentPath
//       ? `${parentPath}${route.path.startsWith('/') ? route.path : `/${route.path}`}`
//       : route.path
//     // 创建菜单项
//     const menuItem: MenuItem = {
//       id: route.name?.toString() || `${parentPath}-${index}`,
//       name: route.meta.title as any,
//       path: fullPath,
//       icon: route.meta.icon,
//     }

//     // 处理子路由（递归）
//     if (route.children && route.children.length > 0) {
//       // 如果父路由有 redirect，使用 redirect 作为默认路径
//       if (route.redirect && !route.path.includes(route.redirect as string)) {
//         menuItem.path = route.redirect as string
//       }

//       menuItem.children = routesToMenu(route.children, route.path, userRoles)

//       // 如果子菜单为空，则不显示父菜单
//       if (menuItem.children.length === 0) {
//         return
//       }
//     }

//     menus.push(menuItem)
//   })

//   return menus
// }

// /**
//  * 注册异步路由
//  * 将路由列表转换为 Vue Router 路由配置，并添加到传入的 router 实例中
//  * @param router Vue Router 实例
//  * @param routes 路由列表
//  */
// const modules: Record<string, () => Promise<any>> = import.meta.glob('../../views/**/*.vue')
// export async function registerDynamicRoutes(router: Router, routes: AppRouteRecord[]) {
//   routes.forEach(route => {
//     if (route.name && !router.hasRoute(route.name)) {
//       let url = `../../views${route.component}/index.vue`
//       route.component = modules[url]
//       if (route.children && route.children.length > 0) {
//         router.addRoute(route as any)
//         route.children.forEach(child => {
//           const childUrl = `../../views${child.component}/index.vue`
//           child.component = modules[childUrl]
//           router.addRoute(route.name, child as any)
//         })
//       } else {
//         router.addRoute('Index', route as any)
//       }
//     }
//   })
// }