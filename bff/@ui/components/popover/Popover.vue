<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from 'radix-vue/Popover'
import { PopoverRoot } from 'radix-vue/Popover'
import { useForwardPropsEmits } from 'radix-vue/utilities'

const props = defineProps<PopoverRootProps>()
const emits = defineEmits<PopoverRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <PopoverRoot v-bind="forwarded">
    <slot />
  </PopoverRoot>
</template>
