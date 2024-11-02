"use client";
import { Flex, Button, TextField, Checkbox } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useLoginForm } from "./login-form.hook";

const LoginForm = () => {
  const { onSubmit, register, loading } = useLoginForm();

  return (
    <>
      <Form.Root className="FormRoot" onSubmit={onSubmit}>
        <Form.Field className="FormField" name="email">
          <Flex align="baseline" justify="between">
            <Form.Label className="FormLabel">Email</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </Flex>
          <Form.Control asChild>
            <TextField.Root  type="email" {...register("email", { required: true })} />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="password">
          <Flex align="baseline" justify="between">
            <Form.Label className="FormLabel">Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your password
            </Form.Message>
            <Form.Message className="FormMessage" match="tooShort">
              Please provide a valid password
            </Form.Message>
          </Flex>
          <Form.Control asChild>
            <TextField.Root type="password" minLength={6} {...register("password", { required: true })} />
          </Form.Control>
        </Form.Field>
        <Flex justify="between" align="center">
          <Flex gap="2">
            <Checkbox defaultChecked {...register("rememberMe")}/>
            Remember me
          </Flex>
          <Button color="green" variant="soft" loading={loading} >
            SIGN IN
          </Button>
        </Flex>
      </Form.Root>
    </>
  )
}
export default LoginForm