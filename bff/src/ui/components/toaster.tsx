"use client"
import { FC } from "react";
import ToastView, { IToastProps } from './toast'
import * as Toast from "@radix-ui/react-toast";
import { useToast } from "@ui/store";

const Toaster: FC = () => {
  const { items } = useToast();

  return (
    <Toast.Provider>
      {
        items.map((d: IToastProps) => (
          <ToastView {...d} key={d.id} />
        ))
      }
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  )
}

export default Toaster;