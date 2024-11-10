"use client";
import { Flex, Button, TextField, Checkbox } from "@radix-ui/themes";
import { useState } from "react";
import { LoginUseCase } from "@usecases";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
import * as Yup from "yup";
import * as Label from "@radix-ui/react-label";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });
  const formData = {
    email: '',
    password: '',
    rememberMe: true,
  }

  const onSubmit = async (formValue: {email: string, password: string, rememberMe: boolean}) => {
    setLoading(true)
    LoginUseCase.execute(formValue.email, formValue.password, !!formValue.rememberMe)
      .then((success: boolean) => {
        if (success) {
          router?.push('/');
        }
      })
      .finally(() => setLoading(false))
    
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="grid gap-2">
          <Flex justify="between">
            <Label.Root htmlFor="email">Email</Label.Root>
            <ErrorMessage component="div" className="FormMessage" name="email" />
          </Flex>
          <Field name="email">
            {({field}: FieldProps) => (
              <TextField.Root type="email" {...field} />
            )}
          </Field>
          <Flex justify="between">
            <Label.Root htmlFor="password">Password</Label.Root>
            <ErrorMessage component="div" className="FormMessage" name="password" />
          </Flex>
          <Field name="password">
            {({field}: FieldProps) => (
              <TextField.Root type="password" {...field} id="password"/>
            )}
          </Field>
          <Flex justify="between" align="center">
            <Flex gap="2">
              <Field name="active">
                {({field, form, meta}: FieldProps) => (
                <Checkbox defaultChecked={true} {...field} onCheckedChange={(value) => setFieldValue(field.name, value)} />
                )}
              </Field>
              Remember me
            </Flex>
            <Button color="green" variant="soft" loading={loading} >
              SIGN IN
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
export default LoginForm