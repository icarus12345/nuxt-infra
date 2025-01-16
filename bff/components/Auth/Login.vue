<script setup lang="ts">
import { Field as FormField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'
import { LoginUseCase } from '@usecases'

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(4).max(50),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((formValue) => {
  console.log(formValue,'formValue')
  LoginUseCase
    .execute(formValue.email, formValue.password)
    .then((success: boolean) => {
      if (success) {
        alert({
          title: 'Login Success !',
          description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(formValue, null, 2))),
        })
      }
    })
    .finally(() => {

    })
  
})
</script>

<template>
  <Card class="w-full max-w-xs self-center m-auto">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
      <form class="space-y-3" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="admin@email.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-between">
          <Button variant="ghost">Cancel</Button>
          <Button variant="soft" color="primary" type="submit">Login</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>