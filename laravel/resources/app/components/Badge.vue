<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    :class="[
      'ui-badge',
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
      props.class,
    ]">
    <slot />
  </span>
</template>