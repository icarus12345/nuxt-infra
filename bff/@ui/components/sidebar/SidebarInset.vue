<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
// import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <main
    :class="cn(
      'relative flex min-h-svh flex-1 flex-col bg-background z-0',
      'peer-data-[variant=inset]:min-h-[calc(100svh-var(--spacing-4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm',
      'md:peer-data-[state=expanded]:max-w-[calc(100dvw_-_var(--sidebar-width))] md:peer-data-[state=collapsed]:max-w-[calc(100dvw_-_var(--sidebar-width-icon))]',
      props.class,
    )"
  >
    <slot />
  </main>
</template>
