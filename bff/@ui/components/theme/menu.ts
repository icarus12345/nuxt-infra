import { tv, type VariantProps } from 'tailwind-variants';

export const menuItemVariants = tv(
  {
    base: [
      'relative flex cursor-default select-none items-center outline-hidden transition-colors data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
      'focus-visible:ring focus-visible:ring-ring'
    ],
    variants: {
      variant: {
        default: 'data-selected:bg-accent data-selected:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-accent',
        zinc: 'data-selected:bg-sidebar-accent data-selected:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground hover:bg-sidebar-accent',
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
