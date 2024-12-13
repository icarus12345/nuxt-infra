<script setup lang="ts">
import { Field as FormField } from 'vee-validate'
import type { FieldProps } from './interface'

const props = defineProps<FieldProps>()
const { layout } = inject('AutoForm')
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs" :layout="layout">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || camelCase(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <div>
            <CKEditor />
          </div>
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage/>
    </FormItem>
  </FormField>
</template>
