import { Flex, Text, Button, AlertDialog, TextField, Checkbox } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";

export default function LoginForm() {
  return (
    <>
      <Form.Root className="FormRoot">
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
            <TextField.Root  type="email" required />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="password">
          <Flex align="baseline" justify="between">
            <Form.Label className="FormLabel">Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your password
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid password
            </Form.Message>
          </Flex>
          <Form.Control asChild>
            <TextField.Root type="password" minLength={6} required />
          </Form.Control>
        </Form.Field>
      </Form.Root>
      
      <Flex justify="between" align="center">
      <Flex gap="2">
        <Checkbox defaultChecked />
        Remember me
      </Flex>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="green" variant="soft">
              SIGN IN
            </Button>
            {/* <Button >Revoke access</Button> */}
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Revoke access</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure? This application will no longer be accessible and any
              existing sessions will be expired.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="solid">
                  Revoke access
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>
    </>
  )
}