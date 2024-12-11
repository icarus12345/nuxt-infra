<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
// import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'radix-vue/Primitive'
import { type ButtonVariants, buttonVariants } from '.'

export interface ButtonProps extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  icon?: ButtonVariants['icon']
  class?: HTMLAttributes['class']
  loading?: ButtonVariants['loading']
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size, icon, loading }), props.class)"
  >
    <slot />
  </Primitive>
</template>
