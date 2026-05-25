<template>
    <div class="main" :style="{ paddingLeft: menuWidth }">
        <div>
            <RouterView v-slot="{ Component }">
                <Transition name="fade" mode="out-in">
                    <keep-alive :include="keepAliveComponents">
                        <component :is="Component" />
                    </keep-alive>
                </Transition>
            </RouterView>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { computed } from "vue"
import { useMenuStore } from "@/store/modules/menu"
import { useRoute } from 'vue-router'
const route = useRoute()
const menuStore = useMenuStore()
const menuWidth = computed(() => menuStore.menuWidth)
// 需要缓存的组件列表
const keepAliveComponents = computed(() => {
    // 可以根据路由元信息动态添加
    const components = ['Dashboard'] // 首页的 name
    if (route.meta.keepAlive) {
        components.push(route.name as string)
    }
    return components
})
</script>

<style lang="scss" scoped>
.main {
    box-sizing: border-box;
    // padding-left: v-bind(menuWidth);
    padding-top: 85px;
    margin: 20px;
    transition: padding-left 0.4s ease;
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
</style>