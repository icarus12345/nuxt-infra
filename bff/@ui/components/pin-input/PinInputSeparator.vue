<script setup lang="ts">
import { Dot } from 'lucide-vue-next'
import { Primitive, type PrimitiveProps } from 'reka-ui/utilities'
import { useForwardProps } from 'reka-ui/utilities'

const props = defineProps<PrimitiveProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <Primitive v-bind="forwardedProps">
    <slot>
      <Dot />
    </slot>
  </primitive>
</template>
