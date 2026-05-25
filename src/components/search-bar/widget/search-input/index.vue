<template>
  <el-input v-model="value" v-bind="config"/>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
export type ValueVO = unknown
interface SearchFormItem {
  placeholder?: string
}
const prop = defineProps<{
  value?: ValueVO // 输入框的值
  config?: SearchFormItem
}>()

const emit = defineEmits<{
  (e: 'update:value', value: ValueVO): void // 更新输入框值的事件
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
