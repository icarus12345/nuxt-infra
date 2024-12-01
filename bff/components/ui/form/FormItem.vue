<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { useId } from 'radix-vue/utilities'
import { type HTMLAttributes, provide } from 'vue'
import { FORM_ITEM_INJECTION_KEY } from './injectionKeys'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  orientation?: 'vertical' | 'horizontal',
}>()

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
provide('FormItem', {
  orientation: props.orientation
})
</script>

<template>
  <div :class="cn(
      orientation === 'vertical' ? 'grid grid-cols-[12rem_1fr] gap-2' : 'space-y-2',
      props.class
    )">
    <slot />
  </div>
</template>
