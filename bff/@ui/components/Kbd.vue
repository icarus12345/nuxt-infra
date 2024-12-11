<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants';
import { computed } from 'vue'

interface KbdProps {
  as?: string
  size?: 'xs' | 'sm' | 'md'
}

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
  size: 'sm',
})

const kbdClass = computed(() => {
  return tv(
    {
      base: 'inline-flex items-center pointer-events-none h-5 select-none items-center gap-1 rounded border border-border bg-muted font-sans font-medium',
      variants: {
        size: {
          xs: 'min-h-4 text-[10px] h-4 px-1',
          sm: 'min-h-5 text-[11px] h-5 px-1.5',
          md: 'min-h-6 text-[12px] h-6 px-1.5',
        },
      },
    },
  )({
    size: props.size,
  })
})
</script>

<template>
  <component :is="props.as" :class="kbdClass">
    <slot />
  </component>
</template>