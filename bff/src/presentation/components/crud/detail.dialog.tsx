import { createRef, FC, MouseEvent, ReactNode, useRef } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, IconButton, Text } from "@radix-ui/themes";
import MemberForm from "./member.form";

const DetailDialog: FC = () => {
  const formRef = createRef<HTMLFormElement>();

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event, formRef.current)
    formRef.current.checkValidity();
  }
  return (
      <AlertDialog.Content size="1">
        <AlertDialog.Title>Member Detail</AlertDialog.Title>
        <MemberForm ref={formRef}/>
        <Flex justify="between">  
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="soft" color="green" onClick={handleSubmit}>Done</Button>
          </AlertDialog.Action>
        </Flex>
        <AlertDialog.Cancel>
          <IconButton aria-label="Close" variant="ghost" className="rt-BaseDialog-Close" color="gray">
            <Cross2Icon />
          </IconButton>
        </AlertDialog.Cancel>
      </AlertDialog.Content>
  )
};

export default DetailDialog;