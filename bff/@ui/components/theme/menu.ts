import { tv, type VariantProps } from 'tailwind-variants';

export const menuItemVariants = tv(
  {
    base: [
      'relative flex cursor-default select-none items-center outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
      'data-selected:bg-accent data-selected:text-accent-foreground',
      'focus:outline-hidden focus:ring focus:ring-ring'
    ],
    variants: {
      variant: {
        default: '',
      },
      size: {
        default: 'h-8 gap-2 px-2 py-1.5 rounded',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type MenuItemVariants = VariantProps<typeof menuItemVariants>
