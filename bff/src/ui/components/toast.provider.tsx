"use client"
import { FC } from "react";
import ToastView, { ToastProps } from './toast'
import * as Toast from "@radix-ui/react-toast";
import { useToastState } from "@/ui/store/toast.slice";
const ToastProvider: FC = () => {
  const { toasts } = useToastState()

  return (
    <Toast.Provider>
      {
        toasts.map((d: ToastProps) => (
          <ToastView {...d} key={d.id} />
        ))
      }
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  )
}

export default ToastProvider;