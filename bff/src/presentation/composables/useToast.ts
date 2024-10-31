import { createContext, useContext } from 'react';
import { ToastProps } from '@presentation/components/toast';
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'alert'

interface ToastContextType {
  alert: (prop: ToastProps) => void;
  // info: (message: string) => void;
  // success: (message: string) => void;
  // warning: (message: string) => void;
  // error: (message: string) => void;
  // confirm: (message: string) => void;
  // prompt: (message: string) => void;
}


export const ToastContext = createContext<Nullable<ToastContextType>>(undefined);
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};