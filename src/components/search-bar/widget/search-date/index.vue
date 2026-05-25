<template>
  <el-date-picker
    v-model="value"
    v-bind="config"
    :style="{ width: '100%' }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 日期选择器类型
type DatePickerType =
  | 'date' // 单日期
  | 'datetime' // 日期时间
  | 'daterange' // 日期范围
  | 'datetimerange' // 日期时间范围
  | 'month' // 月份
  | 'monthrange' // 月份范围
  | 'year' // 年份
  | 'yearrange' // 年份范围
  | 'week' // 周

// 定义组件值类型 - 根据不同类型返回不同的值
export type ValueVO = string | Date | null | undefined | [Date, Date] | [string, string] | number
interface Props {
  value?: ValueVO
  config: {
    type?: DatePickerType
    label?:string
    placeholder?:string
    format?: string
    valueFormat?: string
    startPlaceholder?: string
    endPlaceholder?: string
    rangeSeparator?: string
    disabledDate?: (date: Date) => boolean
    shortcuts?: Array<{
      text: string
      value: Date | (() => Date)
    }>
  }
}

const props = defineProps<Props>()
// 定义emit事件
const emit = defineEmits<{
  'update:value': [value: ValueVO]
}>()

const value = computed({
  get: () => props.value,
  set: (newValue: ValueVO) => emit('update:value', newValue)
})

  // 获取默认配置
  const getDefaultConfig = (type: DatePickerType) => {
    const baseConfig = {
      clearable: true,
      size: 'default' as const
    }

    switch (type) {
      case 'date':
        return {
          ...baseConfig,
          type: 'date' as const,
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD',
          placeholder: props.config.placeholder
        }

      case 'datetime':
        return {
          ...baseConfig,
          type: 'datetime' as const,
          format: 'YYYY-MM-DD HH:mm:ss',
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          placeholder: props.config.placeholder
        }

      case 'daterange':
        return {
          ...baseConfig,
          type: 'daterange' as const,
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD',
          rangeSeparator: '至',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期'
        }

      case 'datetimerange':
        return {
          ...baseConfig,
          type: 'datetimerange' as const,
          format: 'YYYY-MM-DD HH:mm:ss',
          valueFormat: 'YYYY-MM-DD HH:mm:ss',
          rangeSeparator: '至',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间'
        }

      case 'month':
        return {
          ...baseConfig,
          type: 'month' as const,
          format: 'YYYY-MM',
          valueFormat: 'YYYY-MM',
          placeholder: props.config.placeholder
        }

      case 'monthrange':
        return {
          ...baseConfig,
          type: 'monthrange' as const,
          format: 'YYYY-MM',
          valueFormat: 'YYYY-MM',
          rangeSeparator: '至',
          startPlaceholder: '开始月份',
          endPlaceholder: '结束月份'
        }

      case 'year':
        return {
          ...baseConfig,
          type: 'year' as const,
          format: 'YYYY',
          valueFormat: 'YYYY',
          placeholder: props.config.placeholder
        }

      case 'yearrange':
        return {
          ...baseConfig,
          type: 'yearrange' as const,
          format: 'YYYY',
          valueFormat: 'YYYY',
          rangeSeparator: '至',
          startPlaceholder: '开始年份',
          endPlaceholder: '结束年份'
        }

      case 'week':
        return {
          ...baseConfig,
          type: 'week' as const,
          format: 'YYYY 第 ww 周',
          valueFormat: 'YYYY-MM-DD',
          placeholder: props.config.placeholder
        }

      default:
        return {
          ...baseConfig,
          type: 'date' as const,
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD',
          placeholder: props.config.placeholder
        }
    }
  }

// 常用快捷选项
const getCommonShortcuts = (type: DatePickerType) => {
  if (!['daterange', 'datetimerange'].includes(type)) {
    return []
  }

  return [
    {
      text: '今天',
      value: () => {
        const today = new Date()
        return [today, today] as [Date, Date]
      }
    },
    {
      text: '昨天',
      value: () => {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        return [yesterday, yesterday] as [Date, Date]
      }
    },
    {
      text: '最近7天',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setDate(start.getDate() - 6)
        return [start, end] as [Date, Date]
      }
    },
    {
      text: '最近30天',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setDate(start.getDate() - 29)
        return [start, end] as [Date, Date]
      }
    },
    {
      text: '本月',
      value: () => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth(), 1)
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        return [start, end] as [Date, Date]
      }
    },
    {
      text: '上月',
      value: () => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const end = new Date(now.getFullYear(), now.getMonth(), 0)
        return [start, end] as [Date, Date]
      }
    }
  ]
}
// 合并默认配置和自定义配置
const config = computed(() => {
  const dateType = (props.config?.type || 'date') as DatePickerType
  const defaultConfig = getDefaultConfig(dateType)
  const shortcuts = getCommonShortcuts(dateType)
  return{
    ...defaultConfig,
    ...(shortcuts && { shortcuts })
  }
})
</script>