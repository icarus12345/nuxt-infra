<script setup lang="ts">
import { AspectRatio, type AspectRatioProps } from 'radix-vue/AspectRatio'

const props = defineProps<AspectRatioProps>()
</script>

<template>
  <AspectRatio v-bind="props">
    <slot />
  </AspectRatio>
</template>
