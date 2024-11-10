import { FC, LazyExoticComponent, ReactNode, isValidElement, createElement, useState, useRef, useMemo } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, ButtonProps, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { useDialog } from "@ui/store";

export interface IDialogProps<T = {}> {
  id?: number
  icon?: ReactNode
  type?: 'success' | 'error' | 'warning' | 'info' | 'confirm' | 'prompt'
  title?: string
  message?: string
  content?: FC | LazyExoticComponent<FC>
  contentProps?: T
  actionText?: string
  actionProps?: ButtonProps
  cancelText?: string
  cancelProps?: ButtonProps
  // duration?: number // Thời gian hiển thị (mặc định 3000ms)
  onClose?: () => void // Hàm gọi khi đóng toast
  onActionClick?: () => Promise<void | boolean> // Hàm gọi khi click ok
}

const Dialog: FC<IDialogProps> = ({ id, icon, type, title, message, content, contentProps, onClose, actionText, actionProps, cancelText, cancelProps, onActionClick }: IDialogProps) => {
  const Dialoger = useDialog();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const onOpenChange = (open: boolean) => {
    if (!open) {
      Dialoger.remove(id!)
      if (onClose) onClose();
    }
  }
  const renderContent = (content?: FC | LazyExoticComponent<FC>) => {
    if (!content) return null; // Nếu không có content, trả về null
    // Kiểm tra xem content có phải là một phần tử hợp lệ hay không
    if (isValidElement(content)) {
      return content; // Nếu đúng, render trực tiếp
    } else {
      return createElement(content, contentProps); // Nếu không, tạo element từ component
    }
  };

  const handleActionClick = async () => {
    if (onActionClick) {
      setLoading(true)
      onActionClick()
        .then((state) => {
          console.log(state, 'state')
          if (state !== false) {
            closeRef.current?.click()
          }
        })
        .finally(() => setLoading(false))
    }
  }
  return (
    <AlertDialog.Root defaultOpen={true} onOpenChange={onOpenChange}>
      { content ? renderContent(content) : 
        <AlertDialog.Content size="1">
          { 
            title &&
            <AlertDialog.Title className="rt-BaseDialogTitle">
              <Flex gap='2' align="center">
                {icon && <span className="rt-BaseDialog-Icon">{icon}</span>}
                { title }
              </Flex>
            </AlertDialog.Title>
          }
          <AlertDialog.Description className="rt-BaseDialogDescription" size="2"><Text wrap="wrap">{ message }</Text></AlertDialog.Description>
          <Flex gap="2" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" {...cancelProps}>
                { cancelText || 'Cancel'}
              </Button>
            </AlertDialog.Cancel>
            <Button variant="solid" {...actionProps} onClick={handleActionClick} loading={loading}>
              { actionText || 'OK'}
            </Button>
          </Flex>
          <AlertDialog.Cancel>
            <IconButton aria-label="Close" variant="ghost" className="rt-BaseDialog-Close" color="gray" ref={closeRef}>
              <Cross2Icon />
            </IconButton>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      }
    </AlertDialog.Root>
  )
};

export default Dialog;