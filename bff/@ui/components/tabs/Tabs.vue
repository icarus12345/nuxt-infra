<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'radix-vue/Tabs'
import { TabsRoot } from 'radix-vue/Tabs'
import { useForwardPropsEmits } from 'radix-vue/utilities'

const props = defineProps<TabsRootProps>()
const emits = defineEmits<TabsRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TabsRoot v-bind="forwarded">
    <slot />
  </TabsRoot>
</template>
