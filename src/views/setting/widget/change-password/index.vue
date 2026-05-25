<!-- setting/widget/ChangePassword.vue -->
<template>
    <div class="change-password">
        <h3>修改密码</h3>
        <DynamicForm v-model="formData" :form-items="formItems"
            :form-props="formProps" :show-submit="true" submit-text="保存修改" />
    </div>
</template>

<script setup lang="ts">
type PasswordChange = Api.PasswordChange.Change
import { type FormProps } from "element-plus"
const formData = reactive<PasswordChange>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})
// 自定义确认密码校验函数
const validateConfirmPassword = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入新密码'))
    } else if (value !== formData.newPassword) {
        callback(new Error('两次输入的新密码不一致'))
    } else {
        callback()
    }
}
const formItems = ref([
    {
        type: 'Input',
        label: "原密码",
        prop: 'oldPassword',
        props: {
            type: "password",
            showPassword: true
        },
        rules: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
        ]
    },
    {
        type: 'Input',
        label: "新密码",
        prop: 'newPassword',
        props: {
            type: "password",
            showPassword: true
        },
        rules: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, message: '密码长度至少为6位', trigger: 'blur' },
        ]
    },
    {
        type: 'Input',
        label: "确认密码",
        prop: 'confirmPassword',
        props: {
            type: "password",
            showPassword: true
        },
         rules: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { validator: validateConfirmPassword, trigger: ['blur', 'change'] }
        ]
    }
])
const formProps = reactive<FormProps>({
    labelPosition: 'top'
})
</script>
<style lang="scss" scoped>
.change-password {
    padding: 20px;

    h3 {
        padding-bottom: 20px;
    }
}
</style>