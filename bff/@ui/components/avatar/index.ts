import { tv, type VariantProps } from 'tailwind-variants';

export { default as Avatar } from './Avatar.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'
export { default as AvatarImage } from './AvatarImage.vue'

export const avatarVariant = tv(
  {
    base: 'inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden',
    variants: {
      size: {
        sm: 'size-10 text-xs',
        default: 'size-16 text-2xl',
        lg: 'size-20 text-3xl',
        xl: 'size-32 text-5xl',
      },
      shape: {
        none: '',
        circle: 'rounded-full',
        square: 'rounded-md',
      },
    },
    defaultVariants: {
      size: 'default'
    }
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariant>
