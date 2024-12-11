<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
// import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <td
    :class="
      cn(
        'px-2 align-middle [&:has([role=checkbox])]:pr-0 first:pl-4 h-8 py-1 bg-background',
        props.class,
      )
    "
  >
    <slot />
  </td>
</template>
