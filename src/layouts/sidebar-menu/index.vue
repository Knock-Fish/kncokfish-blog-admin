<template>
    <el-scrollbar>
        <el-menu :default-active="activeMenu" :collapse="isCollapse"
            :router="true" :collapse-transition="true">
            <div class="logo">
                <img :src="url" alt="logo" />
                <p :style="{
                    display: isCollapse ? 'none' : 'block'
                }">KnockFishBlog</p>
            </div>
            <TreeMenu :menuData="menuData" />
        </el-menu>
        <div class="modal" @click="handleModal" v-show="!isCollapse" />
    </el-scrollbar>
</template>

<script setup lang='ts'>
import { useMenuStore } from "@/store/modules/menu"
import { useRoute } from "vue-router"
import { type AppRouteRecord } from '@/types'
const route = useRoute()
const url = new URL("@/assets/svg/logo.svg", import.meta.url).href
const menuStore = useMenuStore()
const isCollapse = computed(() => menuStore.isCollapse)
const menuData: AppRouteRecord[] =  menuStore.menuList.filter(item => item.meta?.icon) || []
const handleModal = () => {
    menuStore.setIsCollapse(!isCollapse.value)
}
// 自动根据当前路由设置菜单高亮（刷新也不会丢）
const activeMenu = computed(() => {
    return route.path
})
</script>
<style lang="scss" scoped>
@use "./style.scss";
</style>
