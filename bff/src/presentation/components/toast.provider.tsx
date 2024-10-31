"use client"
import { FC, useEffect, useState } from "react";
import ToastView, { ToastProps } from './toast'
import { ToastContext, ToastType } from "@presentation/composables/useToast";
import * as Toast from "@radix-ui/react-toast";

const ToastProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [nextId, setNextId] = useState<number>(0);

  const alert = (prop: ToastProps) => {
    setNextId((id) => id + 1);
    setToasts((prevDialogs) => [...prevDialogs, { id: nextId, ...prop, onClose() {
      console.log('onClose')
    }} as ToastProps]);
  };
  useEffect(() => {

  }, [toasts, nextId])

  return (
    <Toast.Provider swipeDirection="right">
      <ToastContext.Provider value={{ alert }}>
        {children}
        {
          toasts.map((d: ToastProps) => (
            <ToastView {...d} key={d.id} />
          ))
        }
      </ToastContext.Provider>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  )
}

export default ToastProvider;