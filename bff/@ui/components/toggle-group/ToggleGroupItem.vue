<script setup lang="ts">
import { ToggleVariants, toggleVariants } from '../toggle'
// import { cn } from '@/lib/utils'
import { ToggleGroupItem, type ToggleGroupItemProps } from 'reka-ui/ToggleGroup'
import { useForwardProps } from 'reka-ui/utilities'
import { computed, type HTMLAttributes, inject } from 'vue'


const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
}>()

const context = inject<ToggleVariants>('toggleGroup')

const delegatedProps = computed(() => {
  const { class: _, variant, size, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    v-bind="forwardedProps" :class="cn(toggleVariants({
      variant: context?.variant || variant,
      size: context?.size || size,
    }), props.class)"
  >
    <slot />
  </ToggleGroupItem>
</template>
