import { Button, TextField, IconButton, Flex } from "@radix-ui/themes";
// import * as Tabs from "@radix-ui/react-tabs";
import { Label } from "@radix-ui/react-label";
import * as Form from "@radix-ui/react-form";
import { DotsHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { forwardRef, useRef, useImperativeHandle, FC, FormEvent } from 'react';
import { RoleSelect } from "../widgets";
const MemberForm: FC = forwardRef<HTMLFormElement, React.ComponentPropsWithoutRef<typeof Form.Root>>((props, ref) => {

  const handleSubmit = (event: FormEvent) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event)
  }

  return (
    <Form.Root className="FormRoot" ref={ref} onSubmit={handleSubmit}>
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
          <TextField.Root  type="email" required disabled/>
        </Form.Control>
      </Form.Field>
      <TextField.Root  type="email" required/>
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
          <RoleSelect/>
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="Button" style={{ marginTop: 10 }}>
          Post question
        </button>
      </Form.Submit>
    </Form.Root>
  )
})
export default MemberForm;