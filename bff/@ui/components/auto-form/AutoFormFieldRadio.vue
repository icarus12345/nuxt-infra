<script setup lang="ts">
import { Field as FormField } from 'vee-validate'
import type { FieldProps } from './interface'
import { DataAdapter } from '@interfaces/data-source'

const options = ref([])
const props = defineProps<FieldProps & {
}>()
const { layout } = inject('AutoForm')
onMounted(async () => {
  const dataSource = props.config?.field.dataSource
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
    const res = await dataAdapter.bind({ params })
    if (dataSource.beforeLoadComplete) {
      dataSource.beforeLoadComplete(res)
    }
    options.value = res.records
  }
})
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs" :layout="layout">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || camelCase(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <RadioGroup v-if="config?.component === 'radio'" :disabled="disabled" :layout="'vertical'" v-bind="{ ...slotProps.componentField }">
            <div v-for="(option, index) in options" :key="option" class="flex items-center gap-2">
              <RadioGroupItem :id="`${option}-${index}`" :value="option" />
              <Label :for="`${option}-${index}`">{{ camelCase(option.label || option) }}</Label>
            </div>
          </RadioGroup>

          <Select v-else :disabled="disabled" v-bind="{ ...slotProps.componentField }">
            <SelectTrigger class="w-full">
              <SelectValue :placeholder="config?.inputProps?.placeholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in options" :key="option" :value="option.value || option">
                {{ camelCase(option.label || option) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </slot>
      </FormControl>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
