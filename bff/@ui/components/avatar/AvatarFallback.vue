<script setup lang="ts">
import { AvatarFallback, type AvatarFallbackProps } from 'radix-vue/Avatar'

const props = defineProps<AvatarFallbackProps>()
</script>

<template>
  <AvatarFallback v-bind="props">
    <slot />
  </AvatarFallback>
</template>
