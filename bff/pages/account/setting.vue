<script setup lang="ts">
import { IUser } from "@entities";
import { useAuthStore } from "@gateways";
import { Field as FormField, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'
import { $AuthRepository } from "@repositories";
definePageMeta({
  title: 'Setting',
  layout: 'account',
});
const $AuthStore = useAuthStore()
const formSchema = toTypedSchema(z.object({
}))
const formValues = {
};

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: formValues,
})

const onSubmit = handleSubmit(async (formValue) => {
})
</script>

<template>
  <div>
    <form class="p-4 w-full max-w-xs space-y-3" @submit="onSubmit">
      <h3 class="text-lg">Setting</h3>
      <small class="text-muted-foreground">Your name may appear around application where you contribute or are mentioned. You can remove it at any time.</small>
      <AutoFormFieldTagsCombobox />
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Theme mode</FormLabel>
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
      
      <div class="flex justify-between">
        <Button variant="soft" color="primary">Save</Button>
      </div>
    </form>
  </div>
</template>