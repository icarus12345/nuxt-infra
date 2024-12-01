<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <thead :class="cn('[&_tr]:border-b sticky top-0 z-[2] rounded-t [&>tr:first-child>th:first-child]:rounded-tl [&>tr:first-child>th:last-child]:rounded-tr', props.class)">
    <slot />
  </thead>
</template>
