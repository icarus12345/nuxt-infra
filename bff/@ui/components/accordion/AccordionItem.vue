<script setup lang="ts">
import { AccordionItem, type AccordionItemProps } from 'radix-vue/Accordion'
import { useForwardProps } from 'radix-vue/utilities'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AccordionItem
    v-bind="forwardedProps"
    :class="cn('border-b', props.class)"
  >
    <slot />
  </AccordionItem>
</template>
