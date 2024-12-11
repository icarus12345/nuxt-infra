<script setup lang="ts">
// import { cn } from '@/lib/utils'
import { TreeRoot, type TreeRootEmits, type TreeRootProps } from 'radix-vue/Tree'
import { useForwardPropsEmits } from 'radix-vue/utilities'
import { computed, type HTMLAttributes, provide } from 'vue'


const props = defineProps<TreeRootProps & {
  class?: HTMLAttributes['class']
  // variant?: TreeRootVariants['variant']
  // size?: TreeRootVariants['size']
}>()
const emits = defineEmits<TreeRootEmits>()

provide('tree', {
  // variant: props.variant,
  // size: props.size,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TreeRoot v-slot="slotProps" v-bind="forwarded" :class="cn('list-none select-none w-56 bg-background rounded', props.class)">
    <slot v-bind="slotProps" />
  </TreeRoot>
</template>
