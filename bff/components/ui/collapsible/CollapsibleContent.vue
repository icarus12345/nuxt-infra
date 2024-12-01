<script setup lang="ts">
import { CollapsibleContent, type CollapsibleContentProps } from 'radix-vue/Collapsible'

const props = defineProps<CollapsibleContentProps>()
</script>

<template>
  <CollapsibleContent v-bind="props" class="data-[state=closed]:overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
    <slot />
  </CollapsibleContent>
</template>
