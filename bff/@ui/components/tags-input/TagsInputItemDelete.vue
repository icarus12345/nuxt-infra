<script setup lang="ts">
// import { cn } from '@/lib/utils'
import { X } from 'lucide-vue-next'
import { TagsInputItemDelete, type TagsInputItemDeleteProps } from 'radix-vue/TagsInput'
import { useForwardProps } from 'radix-vue/utilities'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<TagsInputItemDeleteProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItemDelete v-bind="forwardedProps" :class="cn('flex rounded-xs bg-transparent mr-1 hover:bg-background hover:text-accent-foreground', props.class)">
    <slot>
      <X class="size-4" />
    </slot>
  </TagsInputItemDelete>
</template>
