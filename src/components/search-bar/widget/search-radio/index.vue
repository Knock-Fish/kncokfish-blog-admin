<template>
  <el-radio-group v-model="value">
    <el-radio
      v-for="item in options"
      :value="item.value"
    >{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script setup lang='ts'>
import { computed } from "vue"
interface OptionItem {
  value: string
  label: string
}
const prop = withDefaults(defineProps<{
  value?: string
  options: OptionItem[]
}>(), {})


const emit = defineEmits<{
  (e: 'update:value', value: string): void // 更新输入框值的事件
}>()

// 计算属性:处理v-model双向绑定
const value = computed({
  get: () => prop.value as string,
  set: (value: string) => emit('update:value', value)
})
</script>

<style lang="scss" scoped></style>