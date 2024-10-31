"use client"
import { FC, useEffect, useState } from "react";
import DialogView, { DialogProps } from './dialog'
import { DialogContext, DialogType } from "@presentation/composables/useDialog";

const DialogProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dialogs, setDialogs] = useState<DialogProps[]>([]);
  const [nextId, setNextId] = useState<number>(0);

  const add = (prop: DialogProps) => {
    setNextId((id) => id + 1);
    setDialogs((prevDialogs) => [...prevDialogs, { id: nextId, ...prop} as DialogProps]);
  };

  const alert = (prop: DialogProps) => {
    setNextId((id) => id + 1);
    setDialogs((prevDialogs) => [...prevDialogs, { id: nextId, ...prop, type: 'alert' as DialogType , onClose() {
      console.log('onClose')
    }} as DialogProps]);
  };
  useEffect(() => {

  }, [dialogs, nextId])

  return (
    <DialogContext.Provider value={{ add, alert }}>
      {children}
      {
        dialogs.map((dialog: DialogProps) => (
          <DialogView {...dialog} key={dialog.id} />
        ))
      }
    </DialogContext.Provider>
  )
}

export default DialogProvider;