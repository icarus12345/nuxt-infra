<script lang="ts" setup>
import type { LabelProps } from 'radix-vue/Label'
import type { HTMLAttributes } from 'vue'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useFormField } from './useFormField'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
const { orientation } = inject('AutoForm')

</script>

<template>
  <Label
    :class="cn(
      // error && 'text-destructive',
      props.class,
    )"
    :for="formItemId"
  >
    <span :class="orientation === 'vertical' && 'min-h-8 grid items-center text-right'">
      <span><slot /></span>
    </span>
  </Label>
</template>
