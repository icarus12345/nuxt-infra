import { tv, type VariantProps } from 'tailwind-variants';
export const dataTableVariants = tv(
  {
    base: 'relative h-[calc(100dvh-26rem)]',
    variants: {
      variant: {
        none: '',
        default: 'rounded-md border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type DataTableVariants = VariantProps<typeof dataTableVariants>