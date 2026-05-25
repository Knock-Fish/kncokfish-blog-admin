<template>
    <div
        class="tab-dropdown"
        @click="handleClick"
    >
        <SvgIcon icon="mdi:chevron-down" />
        <el-dropdown
            class="dropdown"
            ref="dropdownRef"
            :virtual-ref="triggerRef"
            :show-arrow="false"
            :popper-options="{
                modifiers: [{ name: 'offset', options: { offset: [-100, 0] } }],
            }"
            virtual-triggering
            trigger="click"
            placement="bottom-start"
        >
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleFixedTab">
                        <span>
                            <SvgIcon v-if="!current?.fixedTab" icon="mdi:pin-outline" />
                            <SvgIcon v-else icon="mdi:pin-off-outline" />
                        </span>
                        <span style="margin-left: 5px;">{{ current?.fixedTab ? "取消固定" : "固定标签" }}</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click="handleRemoveLeft">
                        <span>
                            <SvgIcon icon="mdi:chevron-left"/>
                        </span>
                        <span style="margin-left: 5px;">关闭左侧</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click="handleRemoveRight">
                        <span>
                            <SvgIcon icon="mdi:chevron-right"/>
                        </span>
                        <span style="margin-left: 5px;">关闭右侧</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click="handleRemoveRight">
                        <span>
                            <SvgIcon icon="mdi:close"/>
                        </span>
                        <span style="margin-left: 5px;">关闭其他</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import type { DropdownInstance } from 'element-plus'
import { useTabStore } from '@/store/modules/worktab'
import type { Tab } from "@/types/store"
const tabStore = useTabStore()
const isFixed = ref<boolean>(false)
const current = computed(() => tabStore.getTab(tabStore.current.path || ''))
const triggerRef = ref({
    getBoundingClientRect: () => position.value,
})
const dropdownRef = ref<DropdownInstance>()
const position = ref({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
} as DOMRect)

const handleClick = (event: MouseEvent) => {
    const { clientX, clientY } = event
    position.value = DOMRect.fromRect({
        x: clientX,
        y: clientY,
    })
    event.preventDefault()
    dropdownRef.value?.handleOpen()
}
const handleFixedTab = (): void => {
    isFixed.value = tabStore.isFixedTab(tabStore.current as Tab)
}
const handleRemoveLeft = () => {
    tabStore.removeLeftTabs(tabStore.current.path as string)
}
const handleRemoveRight = () => {
    tabStore.removeRightTabs(tabStore.current.path as string)
}
</script>

<style lang="scss" scoped>
.tab-dropdown {
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--card-color);
}
</style>