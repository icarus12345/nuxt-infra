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
          <div class="h-[min(420px,_calc(100vmin_-_32px_-_72px))] relative">
            <Suspense>
              <LazyCKEditor v-bind="{ ...slotProps.componentField, ...config?.inputProps }" :disabled="disabled" @blur="slotProps.handleBlur" />
              <template #fallback>
                <div>
                  <Skeleton class="h-8 rounded mb-px" />
                  <Skeleton class="h-[min(387px,_calc(100vmin_-_65px_-_72px))] rounded" />
                </div>
              </template>
            </Suspense>
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
