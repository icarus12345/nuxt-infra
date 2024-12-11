<script setup lang="ts" generic="T extends ZodRawShape">
import { Field as FormField } from 'vee-validate'
import type { FieldProps } from './interface'
import { DataAdapter } from '@interfaces/data-source'
import type { ZodArray, ZodRawShape } from 'zod'
import { useField, useFieldArray } from 'vee-validate'

const options = ref([])
const props = defineProps<FieldProps & {
  schema?: any
}>()
const field = useField<any>(() => props.fieldName)
const fieldArray = reactive(useFieldArray(props.fieldName));
const { layout } = inject('AutoForm')
const dataSource = props.config?.field.dataSource || props.config?.field.schema.source
onMounted(async () => {
  if (isAsyncFunction(dataSource)) {
    dataSource()
    .then(data => options.value = data)
  } else if (dataSource instanceof Function) {
    options.value = dataSource()
  } else if (dataSource instanceof Array) {
    options.value = dataSource
  } else  if (dataSource) {
    const dataAdapter = new DataAdapter(dataSource)
    const extraParms = dataSource.params || {}
    const params = { ... extraParms }
    const res = await dataAdapter.bind(params)
    if (dataSource.beforeLoadComplete) {
      dataSource.beforeLoadComplete(res)
    }
    options.value = res.records
  }
})

const getOptionValue = (option) => {
  if (typeof option !== 'object') return option
  return getValueByPath(option, dataSource.valueMember)
}

const isChecked = ({ value, handleChange, setValue }, option) => {
  const arr = value || []
  
  const index = arr.findIndex(v => JSON.stringify(getOptionValue(v)) === JSON.stringify(getOptionValue(option)))
  return index >= 0
}

const toggleSelectItem = ({ value, handleChange, setValue }, option) => {
  const arr = value || []
  let optionValue = getOptionValue(option)
  const index = arr.findIndex(v => JSON.stringify(getOptionValue(v)) === JSON.stringify(optionValue))
  if (index >= 0) {
    arr.splice(index, 1)
  } else {
    arr.push(optionValue)
  }
  handleChange(arr)
};
</script>

<template>
  
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem :layout="layout">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.field?.text || config?.label || camelCase(label ?? fieldName) }}
      </AutoFormLabel>
      <FormField
        v-for="(option, index) in options"
        :key="index" type="checkbox" 
        :value="option" 
        :name="fieldName"
        >
        <FormItem class="flex flex-row items-center space-x-3 space-y-0 px-3">
          <FormControl>
            <Checkbox
              :checked="isChecked(slotProps, option)"
              @update:checked="toggleSelectItem(slotProps, option)"
            />
          </FormControl>
          <FormLabel class="font-normal">
            {{ camelCase(getValueByPath(option, dataSource?.displayMember)) }}
          </FormLabel>
        </FormItem>
      </FormField>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
