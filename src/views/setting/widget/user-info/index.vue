<!-- setting/widget/UserInfo.vue -->
<template>
    <div class="user-info">
        <h3>个人信息</h3>
        <DynamicForm v-model="formData" :form-items="formItems" :form-props="formProps"
        :show-submit="true" submit-text="保存修改">
            <template #avatar>
                <ElAvatar :size="100" :src="formData.avatar"/>
            </template>
        </DynamicForm>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user"
import { type FormProps } from "element-plus"
type User = Api.User.UserInfo
const userStore = useUserStore()
const { info } = storeToRefs(userStore)
const formData = reactive<User>({
    username: info.value.username ?? '',
    nickname: info.value.nickname ?? '',
    avatar: info.value.avatar ?? '',
    email: info.value.email ?? '',
    description: info.value.description ?? '',
})
const formItems = ref([
    {
        type: 'avatar',
        prop: 'avatar',
        label: '头像预览',
        slot: "avatar",
        props: {
            
        },
    },
    {
        type: 'Input',
        prop: 'nickname',
        label: '昵称',
        props: {

        },
    },
    {
        type: 'Input',
        prop: 'email',
        label: '邮箱',
        props: {

        },
    },
    {
        type: 'Input',
        prop: 'description',
        label: '概要',
        props: {
            type: 'textarea'
        },
    }
])
const formProps = reactive<FormProps>({
    labelPosition: 'top'
})
</script>
<style lang="scss" scoped>
.user-info {
    padding: 20px;
    h3{
        padding-bottom: 20px;
    }
}
</style>