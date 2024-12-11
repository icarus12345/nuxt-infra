<script setup lang="ts">
// import { cn } from '@/lib/utils'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'radix-vue/ScrollArea'
import { computed, type HTMLAttributes } from 'vue'
import ScrollBar from './ScrollBar.vue'

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ScrollAreaRoot v-bind="delegatedProps" :class="cn('scroll-area relative', props.class)">
    <ScrollAreaViewport class="scroll-area_viewport h-full rounded-[inherit] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar orientation="vertical"/>
    <ScrollBar orientation="horizontal"/>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
