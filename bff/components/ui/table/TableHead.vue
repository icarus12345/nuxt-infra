<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <th :class="cn('h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 first:pl-4 bg-bff', props.class)">
    <slot />
  </th>
</template>
