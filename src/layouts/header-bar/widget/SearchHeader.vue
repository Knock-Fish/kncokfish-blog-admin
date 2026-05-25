<template>
    <div class="search-input" @click="dialogVisible = !dialogVisible">
        <div>
            <SvgIcon icon="mdi:search" color="#78809D" />
            <span>搜索</span>
        </div>
        <div class="search-keydown">
            Ctrl k
        </div>
    </div>
    <ElDialog header-class="dialog-header"
        :header-style="{ paddingBottom: '0', padding: '0' }" style="padding: 0;"
        v-model="dialogVisible" append-to-body :z-index="10001" width="750"
        :fullscreen="width < 750"
        :show-close="false">
        <template #header>
            <div style="padding: 0; margin: 0;">
                <ElInput style="height: 50px;" v-model="query">
                    <template #prefix>
                        <SvgIcon icon="mdi:search" size="2em" />
                    </template>
                    <template #suffix>
                        <SvgIcon style="cursor: pointer;"
                            @click="dialogVisible = !dialogVisible"
                            icon="mdi:close" size="2em" />
                    </template>
                </ElInput>
            </div>
        </template>
        <ElCard>
            <template #header>
                <h3>页面</h3>
            </template>
            <el-scrollbar height="400px">
                <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{
                    item }}
                </p>
            </el-scrollbar>
        </ElCard>
    </ElDialog>
</template>

<script setup lang='ts'>
const dialogVisible = ref<boolean>(false)
const query = ref<string>('')
const { width } = useWindowSize()
</script>
<style lang="scss" scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
:deep(.el-dialog .el-dialog__header) {
    padding: 0 !important;
    margin: 0 !important;
    padding-bottom: 0 !important;
    border-bottom: none !important;
}

:deep(.el-dialog__header.dialog-header) {
    padding: 0 !important;
    margin: 0 !important;
    padding-bottom: 0 !important;
    border-bottom: none !important;
}

.search-input {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 160px;
    height: 36px;
    padding: 0 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;

    &>div {
        display: flex;
        align-items: center;

        span {
            font-size: 13px;
            color: #99A1B7;
            margin-left: 10px;
        }
    }

    .search-keydown {
        border: 1px solid var(--border-color);
        font-size: 12px;
        color: #99A1B7;
        padding: 3px 7px;
        border-radius: 5px;
    }

    .search-wapper {
        position: fixed;
        right: 40%;
        top: 25%;
    }
}
</style>