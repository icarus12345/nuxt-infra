<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'reka-ui/Select'
import { SelectRoot } from 'reka-ui/Select'
import { useForwardPropsEmits } from 'reka-ui/utilities'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <slot />
  </SelectRoot>
</template>
