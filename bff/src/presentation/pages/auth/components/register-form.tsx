import { Button, TextField, IconButton } from "@radix-ui/themes";
// import * as Tabs from "@radix-ui/react-tabs";
import { Label } from "@radix-ui/react-label";
// import * as Form from "@radix-ui/react-form";
import { DotsHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function RegisterForm() {
  return (
    <>
      <p className="Text">
        Change your password here. After saving, you'll be logged out.
      </p>
      <fieldset className="Fieldset">
        <Label htmlFor="currentPassword">
          Current password
        </Label>
        <TextField.Root id="currentPassword" type="password" />
      </fieldset>
      <fieldset className="Fieldset">
        <Label htmlFor="newPassword">
          New password
        </Label>
        <TextField.Root id="newPassword" type="password" />
      </fieldset>
      <fieldset className="Fieldset">
        <Label htmlFor="confirmPassword">
          Confirm password
        </Label>
        <TextField.Root placeholder="Search the docs…">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Slot>
            <IconButton variant="ghost">
              <DotsHorizontalIcon height="14" width="14" />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </fieldset>
      <div
        style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
      >
        <Button>Change password</Button>
      </div>
    </>
  )
}