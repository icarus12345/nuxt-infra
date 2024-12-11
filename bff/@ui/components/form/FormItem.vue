<script lang="ts" setup>
// import { cn } from '@/lib/utils'
import { useId } from 'radix-vue/utilities'
import { type HTMLAttributes, provide } from 'vue'
import { FORM_ITEM_INJECTION_KEY } from './injectionKeys'
import { type FormItemVariants, formItemVariants } from './theme'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  layout?: FormItemVariants['layout'],
}>()

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
provide('FormItem', {
  layout: props.layout
})
</script>

<template>
  <div :class="cn(
      formItemVariants({ layout }),
      props.class
    )">
    <slot />
  </div>
</template>
