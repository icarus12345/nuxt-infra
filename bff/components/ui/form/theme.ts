import { tv, type VariantProps } from 'tailwind-variants';

export const formControlVariants = tv(
  {
    base: 'flex h-8 w-full border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&[aria-invalid="true"]]:border-destructive autofill:bg-background',
    variants: {
      size: {
        xs: 'h-6 rounded-xs px-2 text-xs',
        sm: 'h-7 rounded-sm px-2.5 text-sm',
        default: 'h-8 px-4 rounded py-2 px-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type FormControlVariants = VariantProps<typeof formControlVariants>
