<script setup lang="ts">
import { ToggleVariants } from '../toggle'
// import { cn } from '@/lib/utils'
import { ToggleGroupRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps } from 'radix-vue/ToggleGroup'
import { useForwardPropsEmits } from 'radix-vue/utilities'
import { computed, type HTMLAttributes, provide } from 'vue'

const props = defineProps<ToggleGroupRootProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
}>()
const emits = defineEmits<ToggleGroupRootEmits>()

provide('toggleGroup', {
  variant: props.variant,
  size: props.size,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToggleGroupRoot v-bind="forwarded" :class="cn('flex items-center justify-center gap-1', props.class)">
    <slot />
  </ToggleGroupRoot>
</template>
