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
import { reactive } from "vue";
const $Toast = useToast()
definePageMeta({
  title: 'Profile',
  layout: 'account',
});
const $AuthStore = useAuthStore()
const formSchema = toTypedSchema(z.object({
  name: z.string().min(2),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email(),
}))
const formValues = {
  name: $AuthStore.profile.attributes.name,
  avatar: $AuthStore.profile.attributes.avatar || '',
  email: $AuthStore.profile.attributes.email,
};
const loading = ref<Boolean>(false)
const { meta, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: formValues,
})

const onSubmit = handleSubmit(async (formValue) => {
  loading.value = true
  await $AuthRepository.updateProfile(formValue)
    .then((user: IUser) => {
      if (user) {
        $Toast.success({
          title: 'Success !',
          description: 'Update Profile Success !',
        })
        $AuthStore.setProfile(user);
      }
    })
    .finally(() => {
      loading.value = false
    })
  
})
</script>

<template>
  <div>
    <form class="p-4 w-full max-w-xs space-y-3" @submit="onSubmit">
      <h3 class="text-lg">Public Profile</h3>
      <small>Your name may appear around application where you contribute or are mentioned. You can remove it at any time.
      </small>
      <AutoFormFieldMedia v-slot="{ componentField }" fieldName="avatar" label="Avatar" :config="{ inputProps: { size: 'xl'} }"/>
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Your name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="bio">
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea type="text" placeholder="Your name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="admin@email.com" v-bind="componentField" disabled/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex justify-between">
        <Button variant="soft" color="primary" :disabled="!meta.dirty" :loading="loading">Update Profile</Button>
      </div>
    </form>
  </div>
</template>