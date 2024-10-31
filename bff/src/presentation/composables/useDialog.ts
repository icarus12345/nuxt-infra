import { DialogProps } from '@presentation/components/dialog';
import { createContext, useContext } from 'react';
export type DialogType = 'success' | 'error' | 'warning' | 'info' | 'alert'

interface DialogContextType {
  add: (prop: DialogProps) => void;
  alert: (prop: DialogProps) => void;
  // info: (message: string) => void;
  // success: (message: string) => void;
  // warning: (message: string) => void;
  // error: (message: string) => void;
  // confirm: (message: string) => void;
  // prompt: (message: string) => void;
}


export const DialogContext = createContext<Nullable<DialogContextType>>(undefined);
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};