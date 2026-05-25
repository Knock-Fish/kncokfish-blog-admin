import { type RouteRecordRaw } from 'vue-router'
import { RoutesAlias } from '../routesAlias'
/**
 * 静态路由配置
 */
export const staticRoutes: RouteRecordRaw[] = [
    {
        path: RoutesAlias.Layout,
        name: "Main",
        component: () => import("@views/index/index.vue"),
        meta: { requiresAuth: true },
        children: [
            {
                path: RoutesAlias.Dashboard,
                name: 'Dashboard',
                component: () => import("@views/dashboard/index.vue"),
                meta: {
                    title: "仪表盘",
                    icon: "mdi:home",
                    keepAlive: true,
                }
            },
            {
                path: RoutesAlias.Article,
                name: 'Article',
                component: () => import("@views/article/index.vue"),
                meta: { title: '文章管理', icon: "mdi:file-document-outline", keepAlive: true },
            },
            {
                path: RoutesAlias.Tag,
                name: 'Tag',
                component: () => import("@views/tag/index.vue"),
                meta: { title: '标签管理', keepAlive: true, icon: "mdi:tag-outline" }
            },
            {
                path: RoutesAlias.Category,
                name: 'Category',
                component: () => import("@views/category/index.vue"),
                meta: { title: '分类管理', keepAlive: true, icon: 'mdi:category-plus-outline' }
            },
            {
                path: RoutesAlias.Site,
                name: 'Site',
                component: () => import("@views/site/index.vue"),
                meta: { title: '站点管理', keepAlive: true, icon: 'mdi:information-outline' }
            },
            {
                path: RoutesAlias.Archive,
                name: 'Archive',
                component: () => import("@views/archive/index.vue"),
                meta: { title: '归档管理', keepAlive: true, icon: 'mdi:cog' }
            },
            {
                path: RoutesAlias.Link,
                name: 'Link',
                component: () => import("@views/link/index.vue"),
                meta: { title: '友链', keepAlive: true, icon: 'mdi:package-variant' }
            },
            {
                path: RoutesAlias.FileList,
                name: 'FileList',
                component: () => import("@views/file-list/index.vue"),
                meta: { title: '文件管理', keepAlive: true, icon: 'mdi:folder-open-outline' }
            },
            {
                path: "/account",
                name: 'Account',
                redirect: '/account/user',
                meta: { title: '用户和权限', icon: 'mdi:user-outline' },
                children: [
                    {
                        path: RoutesAlias.User,
                        name: 'User',
                        component: () => import("@views/account/user/index.vue"),
                        meta: { title: '用户管理', keepAlive: true, icon: 'mdi:user-outline' }
                    },
                    {
                        path: RoutesAlias.Permission,
                        name: 'Permission',
                        component: () => import("@views/account/permission/index.vue"),
                        meta: { title: '权限管理', keepAlive: true, icon: 'mdi:account-key-outline' }
                    },
                ]
            },
            {
                path: RoutesAlias.Editor,
                name: 'Editor',
                component: () => import("@views/editor/index.vue"),
                props: true,
                meta: {
                    title: '编辑',
                    hidden: true,
                }
            },
            {
                path: RoutesAlias.Publish,
                name: 'Publish',
                component: () => import("@views/editor/index.vue"),
                props: true,
                meta: {
                    title: '发布',
                    hidden: true,
                }
            },
            {
                path: RoutesAlias.Detail,
                name: 'Detail',
                component: () => import("@views/detail/index.vue"),
                props: true,
                meta: {
                    title: '文章详情',
                    hidden: true,
                }
            },
            {
                path: RoutesAlias.Setting,
                name: 'Setting',
                component: () => import("@views/setting/index.vue"),
                meta: {
                    title: '系统设置',
                    icon: 'mdi:settings'
                }
            },
        ]
    },
    {
        path: RoutesAlias.Login,
        name: "Login",
        component: () => import("@views/login/index.vue")
    },
    {
        path: RoutesAlias.Exception404,
        name: "Exception404",
        component: () => import("@views/exception/404.vue")
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     redirect: '/login'
    // }
]