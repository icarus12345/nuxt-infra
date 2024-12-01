import { tv, type VariantProps } from 'tailwind-variants';

export { default as Button } from './Button.vue'

export const buttonVariants = tv(
  {
    base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 data-[state=open]:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground [&[data-state=open][aria-haspopup]]:bg-accent',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 [&[data-state=open][aria-haspopup]]:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground [&[data-state=open][aria-haspopup]]:bg-accent',
        soft: 'bg-accent/50 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      icon: {
        true: 'aspect-square'
      },
      size: {
        none: '',
        fit: 'p-1',
        xs: 'h-6 rounded-xs px-2 text-xs',
        sm: 'h-7 rounded-sm px-2 text-sm',
        default: 'h-8 px-4 rounded py-2',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-8 w-8',
      },
      color: {
        default: '',
      },
      shape: {
        default: ''
      }
    },
    compoundVariants: [{
      icon: true,
      className: 'p-0'
    }],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
      color: 'default',
      icon: false
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>