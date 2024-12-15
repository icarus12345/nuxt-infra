<script lang="ts" setup>
import type { LabelProps } from 'radix-vue/Label'
import type { HTMLAttributes } from 'vue'
import { useFormField } from './useFormField'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
const { layout } = inject('FormItem')

</script>

<template>
  <Label
    :class="cn(
      // error && 'text-destructive',
      props.class,
    )"
    :for="formItemId"
  >
    <span :class="layout === 'float' ? 'min-h-8 grid items-center text-right' : 'flex items-center min-h-6'">
      <span><slot /></span>
    </span>
  </Label>
</template>
