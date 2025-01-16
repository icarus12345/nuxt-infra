<script setup lang="ts">
import { IUser } from "@entities";
import { useAuthStore } from "@gateways";
import { Field as FormField, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'
import AutoFormFieldMedia from '../../.ui/components/auto-form/AutoFormFieldMedia.vue'
import { $AuthRepository } from "@repositories";
const $Toast = useToast()
definePageMeta({
  title: 'Change Password',
  layout: 'account',
});
const $AuthStore = useAuthStore()
const formSchema = toTypedSchema(
  z.object({
    oldPassword: z.string().min(4),
    password: z.string().min(4),
    confirm: z.string().min(4),
  })
  .refine(data => {
    return data.password === data.confirm
  }, {
    message: 'Passwords must match.',
    path: ['confirm'],
  })
  .refine(data => {
    return data.password !== data.oldPassword
  }, {
    message: 'New password must be different from old password',
    path: ['password'],
  })
)

const loading = ref<Boolean>(false)
const { meta, handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (formValue) => {
  loading.value = true
  await $AuthRepository.updatePassword(formValue.oldPassword, formValue.password)
    .then(() => {
      $Toast.success({
        title: 'Success !',
        description: 'Update Password Success !',
      })
      resetForm()
    })
    .finally(() => {
      loading.value = false
    })
  
})
</script>

<template>
  <div>
    <form class="p-4 w-full max-w-xs space-y-3" @submit="onSubmit">
      <h3 class="text-lg">Change Password</h3>
      <FormField v-slot="{ componentField }" name="oldPassword">
        <FormItem>
          <FormLabel>Old password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Your password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>New password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="New Password" v-bind="componentField"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="confirm">
        <FormItem>
          <FormLabel>Confirm password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="New Password" v-bind="componentField"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex justify-between">
        <Button variant="soft" color="primary" :disabled="!meta.dirty" :loading="loading">Update Password</Button>
      </div>
    </form>
  </div>
</template>