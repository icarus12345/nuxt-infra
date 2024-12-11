<script setup lang="ts">
import {
  DropdownMenuSub,
  type DropdownMenuSubEmits,
  type DropdownMenuSubProps,
} from 'radix-vue/DropdownMenu'
import { useForwardPropsEmits } from 'radix-vue/utilities'
const props = defineProps<DropdownMenuSubProps>()
const emits = defineEmits<DropdownMenuSubEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuSub v-bind="forwarded">
    <slot />
  </DropdownMenuSub>
</template>
