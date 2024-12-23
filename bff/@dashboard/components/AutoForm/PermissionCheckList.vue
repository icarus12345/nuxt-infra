<script setup lang="ts" generic="T extends ZodRawShape">
import { Field as FormField } from 'vee-validate'
import { DataAdapter } from '@interfaces/data-source'
import type { ZodArray, ZodRawShape } from 'zod'
import { FolderKanban } from 'lucide-vue-next'
import { useField, useFieldArray } from 'vee-validate'
import { FieldProps } from '../../../@ui/components/auto-form/interface';
const $Dialog = useDialog()

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
const showDataTableDialog = () => {
  const DataTableDialog = defineAsyncComponent(() => import('@dashboard/components/DataTable/DataTableDialog.vue'))
  $Dialog.show({
    component: shallowRef(DataTableDialog),
    props: {
      content: {
        schema: props.config.field.schema
      }
    },
    callback() {

    }
  })
}
</script>

<template>
  
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs" :layout="layout">
      <div class="flex items-center justify-between">
        <AutoFormLabel v-if="!config?.hideLabel" :required="required">
          {{ config?.field?.text || config?.label || camelCase(label ?? fieldName) }}
        </AutoFormLabel>
        <Button size="xs" :icon="true" variant="ghost" @click="showDataTableDialog" v-if="config.field.schema">
          <FolderKanban class="size-4"/>
        </Button>
      </div>
      <div class="flex flex-col gap-1 max-h-[24rem] overflow-y-auto">
        <FormField
          v-for="(option, index) in options"
          :key="index" type="checkbox" 
          :value="option" 
          :name="fieldName"
          >
          <FormItem class="flex flex-row items-center gap-2 ps-3">
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
      </div>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
