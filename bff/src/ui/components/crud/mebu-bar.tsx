import React from "react";
import {
  ArchiveIcon,
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
  DotFilledIcon,
  HeartIcon,
  Pencil1Icon,
  PlusIcon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import { useDialog } from "@ui/hooks/useDialog";
import DetailDialog from "./detail.dialog";

const RADIO_ITEMS = ["Andy", "Benoît", "Luis"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];

const MenubarDemo = () => {
  const $dialog = useDialog();
  const [checkedSelection, setCheckedSelection] = React.useState([
    CHECK_ITEMS[1],
  ]);
  const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2]);

  const showDetail = () => {
    $dialog.add({
      content: <DetailDialog />
    })
  }

  return (
      <>
      <Flex gap="2">
        <Button color="indigo" variant="soft" size="1" onClick={showDetail}>
          <PlusIcon />New a Member
        </Button>
        <Button color="cyan" variant="soft" loading size="1">
          Edit profile
        </Button>
        <Button color="orange" variant="soft" size="1">
          Toast
        </Button>
        <Button color="crimson" variant="soft" size="1" disabled>
          <TrashIcon/> Delete
        </Button>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger disabled={false}>
            <Button variant="soft" size="1">
              Options
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="1">
            <DropdownMenu.Item><Pencil1Icon/> Edit</DropdownMenu.Item>
            <DropdownMenu.Item><CopyIcon/> Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item><ArchiveIcon />Archive</DropdownMenu.Item>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                <DropdownMenu.Separator />
                <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />
            <DropdownMenu.Item><Share1Icon/>Share</DropdownMenu.Item>
            <DropdownMenu.Item><HeartIcon/>Add to favorites</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red"><TrashIcon/> Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
      
    </>
  );
};

export default MenubarDemo;
