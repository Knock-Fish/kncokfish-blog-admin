<template>
    <div class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="item in breadcrumbList"
                :key="item.path"
                :to="getPath(item)"
            >{{ item.meta.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useRoute, type RouteLocationMatched } from "vue-router"
const route = useRoute()
/** 获取路由路径 */
const getPath = (item: RouteLocationMatched): string | Object => {
    if (!item || !item.meta?.title) return ''
    if (item.children) {
        return { path: item.children[0]?.path }
    }
    return { path: item.redirect ? item.redirect : item.path }
}
/** 面包屑列表 */
const breadcrumbList = computed(() => route.matched.filter((item) => item.meta.title))
</script>

<style lang="scss" scoped>
.breadcrumb {
    height: 40px;
    overflow: hidden;

    .el-breadcrumb {
        height: 40px;
        line-height: 40px;
    }
}
</style>