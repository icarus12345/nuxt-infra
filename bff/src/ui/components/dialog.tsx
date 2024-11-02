import { FC, ReactNode } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Heading, IconButton, Text } from "@radix-ui/themes";

export interface DialogProps {
  id?: number,
  icon?: ReactNode,
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string;
  content?: ReactNode,
  okText?: string;
  cancelText?: string;
  // duration?: number; // Thời gian hiển thị (mặc định 3000ms)
  onClose?: () => void; // Hàm gọi khi đóng toast
}

const Dialog: FC<DialogProps> = ({ icon, type, title, message, content, onClose, okText, cancelText }: DialogProps) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onClose();
  //   }, duration);
  //   return () => clearTimeout(timer);
  // }, [duration, onClose]);
  const onOpenChange = (open: boolean) => {
    if (!open && onClose) onClose();
  }
  return (
    <AlertDialog.Root defaultOpen={true} onOpenChange={onOpenChange}>
      { content ? content : 
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
          <p className="rt-BaseDialogDescription"><Text wrap="wrap">{ message }</Text></p>
          <Flex gap="2" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                { cancelText || 'Cancel'}
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red">
                { okText || 'OK'}
              </Button>
            </AlertDialog.Action>
          </Flex>
          <AlertDialog.Cancel>
            <IconButton aria-label="Close" variant="ghost" className="rt-BaseDialog-Close" color="gray">
              <Cross2Icon />
            </IconButton>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      }
    </AlertDialog.Root>
  )
};

export default Dialog;