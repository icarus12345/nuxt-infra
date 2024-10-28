<template>
  <div id="app">
    <Form @submit="onSubmit" :validation-schema="schema"
      @invalid-submit="onInvalidSubmit">
      <Field name="email" :rules="validateEmail">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <FieldInput type="email" placeholder="Email" />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </Field>
      <Button type="submit">Sign up</Button>
      <Field name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <FieldInput type="text" placeholder="Name" v-model="value" />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </Field>
      <Button type="submit">
        Submit
      </Button>
    </Form>
  </div>
</template>
<script setup>
import { useForm, useField } from 'radix-vue'
import * as Yup from 'yup';
const { value, errorMessage, handleBlur } = useField('username');
const schema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

function onSubmit(values) {
  alert(JSON.stringify(values, null, 2));
}

function onInvalidSubmit() {
}

const validateEmail = (value) => {
  // if the field is empty
  if (!value) {
    return 'This field is required';
  }
  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'This field must be a valid email';
  }
  // All is good
  return true;
}
</script>