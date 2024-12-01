<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ScrollArea class="w-full h-full" type="scroll">
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </ScrollArea>
  
</template>
