<script lang="ts" setup>
import type { StepperTriggerProps } from 'radix-vue/Stepper'
// import { cn } from '@/lib/utils'
import { StepperTrigger } from 'radix-vue/Stepper'
import { useForwardProps } from 'radix-vue/utilities'

import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<StepperTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperTrigger
    v-bind="forwarded"
    :class="cn('p-2 flex flex-col items-center text-center gap-2 rounded-md', props.class)"
  >
    <slot />
  </StepperTrigger>
</template>
