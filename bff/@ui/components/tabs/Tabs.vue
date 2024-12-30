<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui/Tabs'
import { TabsRoot } from 'reka-ui/Tabs'
import { useForwardPropsEmits } from 'reka-ui/utilities'

const props = defineProps<TabsRootProps>()
const emits = defineEmits<TabsRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TabsRoot v-bind="forwarded">
    <slot />
  </TabsRoot>
</template>
