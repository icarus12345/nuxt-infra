export { default as AlertDialog } from './AlertDialog.vue'
export { default as AlertDialogAction } from './AlertDialogAction.vue'
export { default as AlertDialogCancel } from './AlertDialogCancel.vue'
export { default as AlertDialogContent } from './AlertDialogContent.vue'
export { default as AlertDialogDescription } from './AlertDialogDescription.vue'
export { default as AlertDialogFooter } from './AlertDialogFooter.vue'
export { default as AlertDialogHeader } from './AlertDialogHeader.vue'
export { default as AlertDialogTitle } from './AlertDialogTitle.vue'
export { default as AlertDialogTrigger } from './AlertDialogTrigger.vue'
export { default as AlertDialoger } from './AlertDialoger.vue'
import { tv, type VariantProps } from 'tailwind-variants';
export { useAlertDialog } from './useAlertDialog'

export const dialogVariants = tv(
  {
    base: 'fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 border p-4 gap-3 rounded bg-background shadow max-h-[calc(100dvh_-_32px)]',
    variants: {
      size: {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        default: 'max-w-md',
        lg: 'max-w-lg',
        full: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type DialogVariants = VariantProps<typeof dialogVariants>