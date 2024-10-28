import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";

export default function Dialog() {
  return (
    <AlertDialog.Root defaultOpen={true}>
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
            <Button variant="solid" color="red">
              Revoke access
            </Button>
          </AlertDialog.Action>
        </Flex>
        <AlertDialog.Cancel>
          <IconButton aria-label="Close" variant="ghost" className="rt-BaseDialog-Close" color="gray">
            <Cross2Icon />
          </IconButton>
        </AlertDialog.Cancel>
      </AlertDialog.Content>
    </AlertDialog.Root>
    // <Dialog.Root defaultOpen={true}>
    //   <Dialog.Content>
    //     <Dialog.Title>Edit profile</Dialog.Title>
    //     <Dialog.Description>
    //       Make changes to your profile here. Click save when you're done.
    //     </Dialog.Description>
    //     <fieldset className="Fieldset">
    //       <label className="Label" htmlFor="name">
    //         Name
    //       </label>
    //       <TextField.Root className="Input" id="name" defaultValue="Pedro Duarte" />
    //     </fieldset>
    //     <fieldset className="Fieldset">
    //       <label className="Label" htmlFor="username">
    //         Username
    //       </label>
    //       <TextField.Root className="Input" id="username" defaultValue="@peduarte" />
    //     </fieldset>
    //     <Flex gap="3" mt="4" justify="end">
    //       <AlertDialog.Cancel>
    //         <Button variant="soft" color="gray">
    //           Cancel
    //         </Button>
    //       </AlertDialog.Cancel>
    //       <AlertDialog.Action>
    //         <Button variant="solid">
    //           Revoke access
    //         </Button>
    //       </AlertDialog.Action>
    //     </Flex>
    //     <div
    //       style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
    //     >
    //       <Dialog.Close>
    //         <Button variant="soft" color="green">Save changes</Button>
    //       </Dialog.Close>
    //     </div>
    //     <Dialog.Close>
    //       <IconButton aria-label="Close" variant="soft">
    //         <Cross2Icon />
    //       </IconButton>
    //     </Dialog.Close>
    //   </Dialog.Content>
    // </Dialog.Root>
  )
};
