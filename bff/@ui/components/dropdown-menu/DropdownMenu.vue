<script setup lang="ts">
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps } from 'radix-vue/DropdownMenu'
import { useForwardPropsEmits } from 'radix-vue/utilities'

const props = defineProps<DropdownMenuRootProps>()
const emits = defineEmits<DropdownMenuRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>
