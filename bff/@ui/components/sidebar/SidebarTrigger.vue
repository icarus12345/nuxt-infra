<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
// import { cn } from '@/lib/utils'
import { PanelLeft, PanelLeftOpen } from 'lucide-vue-next'
import { useSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar, state, isMobile, openMobile } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    variant="ghost"
    :icon="true"
    :class="props.class"
    @click="toggleSidebar"
  >
    <PanelLeft v-if="state === 'collapsed'" />
    <PanelLeftOpen v-else />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
