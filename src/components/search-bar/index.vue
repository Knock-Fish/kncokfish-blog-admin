<template>
    <!-- 搜索栏 -->
    <section class="search">
        <ElForm ref="formRef" :model="keyword" label-position="right"
            label-width="auto">
            <ElRow :gutter="12">
                <ElCol :xs="24" :sm="12" :md="6" :lg="6" :xl="6"
                    v-for="(item, index) in searchList"
                    v-show="index < 3 || isExpand">

                    <ElFormItem :label="item.label" :prop="item.prop">
                        <component :is="components[item.current]"
                            v-model="keyword[item.prop]" :config="item.props"
                            :options="item.options"></component>
                    </ElFormItem>

                </ElCol>
                <el-col class="action-column" :xs="24" :sm="24" :md="6" :lg="6"
                    :xl="6">
                    <div
                        :class="{ 'action-column-buttons': searchList.length > 3 }">
                        <el-button type="info" @click="onReset">重置</el-button>
                        <el-button type="primary"
                            @click="onSubmit">查询</el-button>
                        <div class="expand">
                            <span @click="isExpand = !isExpand"
                                v-if="searchList.length > 3">{{ isExpand ? "收起"
                                : "展开" }}
                                <SvgIcon
                                    :icon="isExpand ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                            </span>
                        </div>
                    </div>
                </el-col>
            </ElRow>
        </ElForm>
    </section>
</template>

<script setup lang='ts'>
import type { FormInstance } from 'element-plus'
import SearchDate from "./widget/search-date/index.vue"
import SearchInput from "./widget/search-input/index.vue"
import SearchSelect from "./widget/search-select/index.vue"
import SearchRadio from "./widget/search-radio/index.vue"
const components: any = {
    date: markRaw(SearchDate),
    input: markRaw(SearchInput),
    select: markRaw(SearchSelect),
    radio: markRaw(SearchRadio)
}

// 定义类型接口
interface Search {
    current: string
    prop: string
    label: string
    props?: Record<string, any>
    options?: Record<string, any>
}
const formRef = ref<FormInstance>()
const props = withDefaults(defineProps<{
    searchList: Search[]
    keyword: Record<string, any>
}>(), {})
const isExpand = ref<boolean>(false)
const emit = defineEmits<{
    (e: 'submit'): void
    (e: 'reset'): void
}>()
const onSubmit = () => {
    emit('submit')
}
const onReset = () => {
    if (!formRef.value) return
    formRef.value?.resetFields()
    emit('reset')
}
</script>

<style lang="scss" scoped>
.search {
    box-sizing: border-box;
    padding: 15px 20px 0;
    width: 100%;
    background-color: var(--card-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;

    .action-column {
        flex: 1;
        max-width: 100%;

        .action-column-buttons {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 15px;

            .expand {
                @include flex-center();
                span {
                    color: #5D87FF;
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>