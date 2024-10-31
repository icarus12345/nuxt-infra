import { FC, useState, useRef, useEffect, Component, ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";
import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

export interface ToastProps {
  id?: number,
  icon?: ReactNode,
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  okText?: string;
  duration?: number; // Thời gian hiển thị (mặc định 3000ms)
  onClose?: () => void; // Hàm gọi khi đóng toast
}

const Toaster: FC<ToastProps> = ({ icon, type, title, message, duration, onClose }: ToastProps) => {
  return (
      <Toast.Root color={type} className="ToastRoot" defaultOpen={true} onOpenChange={onClose} duration={duration || 50000}>
        <Toast.Title className="ToastTitle">
          <Flex gap='2' align="center">
            {icon && <span className="ToastIcon">{icon}</span>}
            { title }
          </Flex>
        </Toast.Title>
        <Toast.Description className="ToastDescription"><Text wrap="wrap">{ message }</Text></Toast.Description>
        <Toast.Action
          className="ToastAction"
          asChild
          altText={message}
        >
          <IconButton aria-label="Close" variant="ghost" className="ToastClose" color="gray">
            <Cross2Icon />
          </IconButton>
        </Toast.Action>
      </Toast.Root>
  );
};
export default Toaster