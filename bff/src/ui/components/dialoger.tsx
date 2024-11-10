"use client"
import { FC } from "react";
import DialogView, { IDialogProps } from './dialog'
import { useDialog } from "@ui/store";

const Dialoger: FC = () => {
  const { items } = useDialog();

  return (
    <>
      {
        items.map((dialog: IDialogProps) => (
          <DialogView {...dialog} key={dialog.id} />
        ))
      }
    </>
  )
}

export default Dialoger;