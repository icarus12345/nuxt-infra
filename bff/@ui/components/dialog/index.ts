export { default as Dialog } from './Dialog.vue'
export { default as DialogClose } from './DialogClose.vue'
export { default as DialogContent } from './DialogContent.vue'
export { default as DialogDescription } from './DialogDescription.vue'
export { default as DialogFooter } from './DialogFooter.vue'
export { default as DialogHeader } from './DialogHeader.vue'
export { default as DialogScrollContent } from './DialogScrollContent.vue'
export { default as DialogTitle } from './DialogTitle.vue'
export { default as DialogTrigger } from './DialogTrigger.vue'
export { default as DialogBody } from './DialogBody.vue'
export { default as Dialoger } from './Dialoger.vue'
import { tv, type VariantProps } from 'tailwind-variants';
export const dialogVariants = tv(
  {
    base: 'fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 border p-4 gap-3 rounded bg-background shadow-sm max-h-[calc(100dvh_-_32px)]',
    variants: {
      size: {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        default: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type DialogVariants = VariantProps<typeof dialogVariants>