<script setup lang="ts">
import { Dot } from 'lucide-vue-next'
import { Primitive, type PrimitiveProps } from 'radix-vue/Primitive'
import { useForwardProps } from 'radix-vue/utilities'

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
