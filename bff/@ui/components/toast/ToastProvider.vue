<script setup lang="ts">
import { ToastProvider, type ToastProviderProps } from 'radix-vue/Toast'

const props = defineProps<ToastProviderProps>()
</script>

<template>
  <ToastProvider v-bind="props">
    <slot />
  </ToastProvider>
</template>
