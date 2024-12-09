<script setup lang="ts">
import type { FieldProps } from './interface'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AutoFormLabel from './AutoFormLabel.vue'
import { beautifyObjectName } from './utils'
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
    <FormItem :layout="layout">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <RadioGroup v-if="config?.component === 'radio'" :disabled="disabled" :layout="'vertical'" v-bind="{ ...slotProps.componentField }">
            <div v-for="(option, index) in options" :key="option" class="flex items-center gap-2">
              <RadioGroupItem :id="`${option}-${index}`" :value="option" />
              <Label :for="`${option}-${index}`">{{ beautifyObjectName(option.label || option) }}</Label>
            </div>
          </RadioGroup>

          <Select v-else :disabled="disabled" v-bind="{ ...slotProps.componentField }">
            <SelectTrigger class="w-full">
              <SelectValue :placeholder="config?.inputProps?.placeholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in options" :key="option" :value="option.value || option">
                {{ beautifyObjectName(option.label || option) }}
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
