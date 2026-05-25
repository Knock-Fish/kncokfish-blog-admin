<template>
    <el-select
        v-model="value"
        v-bind="config"
        clearable
    >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue"
// 定义组件值类型
export type ValueVO = unknown
interface OptionItem {
    value: ValueVO
    label: string
}
interface SearchFormItem {
    placeholder?: string
}
const prop = defineProps<{
    value?: ValueVO // 选择框的值
    options: OptionItem[]
    config?: SearchFormItem
}>()
// 定义emit事件
const emit = defineEmits<{
    (e: 'update:value', value: ValueVO): void // 更新选择框值的事件
}>()
// 计算属性:处理v-model双向绑定
const value = computed({
    get: () => prop.value as string,
    set: (value: ValueVO) => emit('update:value', value)
})
// 合并默认配置和自定义配置
const config = reactive({
    ...(prop.config || {})
})
</script>
