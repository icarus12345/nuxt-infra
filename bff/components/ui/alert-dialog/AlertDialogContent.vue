<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  AlertDialogContent,
  type AlertDialogContentEmits,
  type AlertDialogContentProps,
  AlertDialogOverlay,
  AlertDialogPortal,
} from 'radix-vue/AlertDialog'
import { useForwardPropsEmits } from 'radix-vue/utilities'
import { computed, type HTMLAttributes } from 'vue'
import { type DialogVariants, dialogVariants } from '.'

const props = defineProps<AlertDialogContentProps & { 
  class?: HTMLAttributes['class'],
  size?: DialogVariants['size']
}>()
const emits = defineEmits<AlertDialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay
      class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <AlertDialogContent
      v-bind="forwarded"
      :class="
        cn(
          dialogVariants({ size }),
          props.class,
        )
      "
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
