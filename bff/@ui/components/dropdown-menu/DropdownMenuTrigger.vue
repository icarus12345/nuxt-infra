<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps } from 'reka-ui/DropdownMenu'
import { useForwardProps } from 'reka-ui/utilities'

const props = defineProps<DropdownMenuTriggerProps>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger class="outline-hidden" v-bind="forwardedProps">
    <slot />
  </DropdownMenuTrigger>
</template>
