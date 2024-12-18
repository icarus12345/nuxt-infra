import { tv, type VariantProps } from 'tailwind-variants';

export { default as Badge } from './Badge.vue'

export const badgeVariants = tv(
  {
    base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'border text-foreground',
        ghost: 'text-foreground',
        dot: 'text-foreground before:content-[\'\'] before:size-2 before:rounded-full flex gap-1',
      },
      color: {
        default: '',
        muted: 'bg-muted/50 before:bg-muted',
        success: 'bg-green-500/30 before:bg-green-500',
      }
    },
    compoundVariants: [
      {
        variant: ['dot'],
        class: 'p-0 bg-transparent'
      }
    ],
    defaultVariants: {
      variant: 'default',
      color: 'default'
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
