<script setup lang="ts">
import type { FieldProps } from './interface'

defineOptions({
  inheritAttrs: false,
})

defineProps<FieldProps>()
const { layout } = inject('AutoForm')

</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem :layout="layout">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || camelCase(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <Input type="number" v-bind="{ ...slotProps.componentField, ...config?.inputProps }" :disabled="disabled" />
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
