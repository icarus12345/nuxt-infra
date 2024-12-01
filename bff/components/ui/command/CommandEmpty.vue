<script setup lang="ts">
import type { ComboboxEmptyProps } from 'radix-vue/Combobox'
import { cn } from '@/lib/utils'
import { ComboboxEmpty } from 'radix-vue/Combobox'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ComboboxEmpty v-bind="delegatedProps" :class="cn('min-h-10 text-center text-sm flex items-center justify-center text-muted-foreground', props.class)">
    <slot />
  </ComboboxEmpty>
</template>
