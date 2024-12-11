<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'radix-vue/Select'
import { SelectRoot } from 'radix-vue/Select'
import { useForwardPropsEmits } from 'radix-vue/utilities'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <slot />
  </SelectRoot>
</template>
