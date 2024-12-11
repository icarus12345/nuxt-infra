<script setup lang="ts">
// import { cn } from '@/lib/utils'
import { TreeItem, type TreeItemProps } from 'radix-vue/Tree'
import { useForwardPropsEmits } from 'radix-vue/utilities'
import { computed, type HTMLAttributes, provide } from 'vue'


const props = defineProps<{
  class?: HTMLAttributes['class']
  // variant?: TreeRootVariants['variant']
  // size?: TreeRootVariants['size']
}>()


const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <TreeItem v-slot="slotProps" v-bind="forwarded" :class="cn('flex items-center py-1 px-2 my-0.5 rounded outline-none focus:ring-grass8 focus:ring-2 data-[selected]:bg-grass4', props.class)">
    <slot v-bind="slotProps" />
  </TreeItem>
</template>
