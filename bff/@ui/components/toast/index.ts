import type { ToastRootProps } from 'radix-vue/Toast'
import type { HTMLAttributes } from 'vue'

export { default as Toast } from './Toast.vue'
export { default as ToastAction } from './ToastAction.vue'
export { default as ToastClose } from './ToastClose.vue'
export { default as ToastDescription } from './ToastDescription.vue'
export { default as Toaster } from './Toaster.vue'
export { default as ToastProvider } from './ToastProvider.vue'
export { default as ToastTitle } from './ToastTitle.vue'
export { default as ToastViewport } from './ToastViewport.vue'

import { tv, type VariantProps } from 'tailwind-variants';

export const toastVariants = tv(
  {
    base: 'group border border-border/50 pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded p-3 pr-8 shadow-lg transition-all ',
    variants: {
      variant: {
        default: 'bg-background/90 text-foreground',
        destructive: 'destructive bg-destructive text-destructive-foreground',
        success: 'bg-background/90 text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type ToastVariants = VariantProps<typeof toastVariants>

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariants['variant']
  onOpenChange?: ((value: boolean) => void) | undefined
}
