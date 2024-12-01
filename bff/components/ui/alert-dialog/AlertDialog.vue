<script setup lang="ts">
import { type AlertDialogEmits, type AlertDialogProps, AlertDialogRoot } from 'radix-vue/AlertDialog'
import { useForwardPropsEmits } from 'radix-vue/utilities'

const props = defineProps<AlertDialogProps>()
const emits = defineEmits<AlertDialogEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AlertDialogRoot v-bind="forwarded">
    <slot />
  </AlertDialogRoot>
</template>
