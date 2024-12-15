<script setup lang="ts">
import { Field as FormField } from 'vee-validate'
import type { FieldProps } from './interface'
import { Checkbox } from '../checkbox'
import { Switch } from '../switch'
import { computed } from 'vue'
import AutoFormLabel from './AutoFormLabel.vue'

const props = defineProps<FieldProps>()
const { layout } = inject('AutoForm')

const booleanComponent = computed(() => props.config?.component === 'Switch' ? Switch : Checkbox)
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs" :layout="layout">
      <div class="flex items-center gap-2 col-start-2">
        <FormControl>
          <slot v-bind="slotProps">
            <component
              :is="booleanComponent"
              v-bind="{ ...slotProps.componentField }"
              :disabled="disabled"
              :checked="slotProps.componentField.modelValue"
              @update:checked="slotProps.componentField['onUpdate:modelValue']"
            />
          </slot>
        </FormControl>
        <AutoFormLabel v-if="!config?.hideLabel" :required="required">
          {{ config?.label || camelCase(label ?? fieldName) }}
        </AutoFormLabel>
      </div>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
