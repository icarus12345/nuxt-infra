import { FC, ReactNode } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Dialog, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import Table from "./table";
import { IDataAdapter } from ".";

const FullScreen: FC<{ adapter: IDataAdapter }> = ( { adapter }) => {
  return (
    // <Dialog.Root>
    //   <Dialog.Trigger>
    //     { children }
    //   </Dialog.Trigger>
      <AlertDialog.Content className="rt-DialogFullScreen">
        <AlertDialog.Title>{adapter.text.title}</AlertDialog.Title>
        {/* <AlertDialog.Description>
          Make changes to your profile here. Click save when you're done.
        </AlertDialog.Description> */}
        <Table adapter={adapter} />
        <Flex justify="between">
          <Button variant="soft" color="gray">
            Cancel
          </Button>
          <AlertDialog.Action>
            <Button variant="soft" color="green">Done</Button>
          </AlertDialog.Action>
        </Flex>
        <AlertDialog.Cancel>
          <IconButton aria-label="Close" variant="ghost" className="rt-BaseDialog-Close" color="gray">
            <Cross2Icon />
          </IconButton>
        </AlertDialog.Cancel>
      </AlertDialog.Content>
    // </Dialog.Root>
  )
};

export default FullScreen;