<script setup lang="ts" generic="T extends ZodRawShape">
import type { FieldProps } from './interface'
import { beautifyObjectName } from './utils'
import { DataAdapter } from '@interfaces/data-source'
import { object, type ZodArray, type ZodRawShape } from 'zod'
import { CirclePlus, Check, AppWindow, Settings2, NotepadText, FolderKanban } from 'lucide-vue-next'
import { useField, useFieldArray } from 'vee-validate'
import { onMounted } from 'vue'
const options = ref([])
const props = defineProps<FieldProps & {
  schema?: any
}>()
const field = useField<any>(() => props.fieldName)
const fieldArray = reactive(useFieldArray(props.fieldName));
const { layout } = inject('AutoForm')
const dataSource = props.config?.field.dataSource || props.config?.field.schema.source
const loadData = async () => {
  if (isAsyncFunction(dataSource)) {
    dataSource().then(data => options.value = data)
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
}

const getOptionValue = (option) => {
  if (typeof option !== 'object') return option
  return getValueByPath(option, dataSource.valueMember)
}

const isChecked = ({ value, handleChange, setValue }, option) => {
  const arr = value || []
  const index = arr.findIndex(v => JSON.stringify(getOptionValue(v)) === JSON.stringify(getOptionValue(option)))
  return index >= 0
}

const onChange = (state) => {
  if (state) {
    loadData()
  }
}
const getSelectedOptions = (slotProps) => options.value.filter((option) => isChecked(slotProps, option))

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
const handleClearFilter = ({ value, handleChange, setValue }) => {
  handleChange([])
}
onMounted(() => {
  loadData()
  // if (field.dataSource instanceof Object) {
  //   const dataAdapter = new DataAdapter(field.dataSource)
  //   value = dataAdapter.parse(value)
  // }
})
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem :layout="layout">
      <div class="flex items-center justify-between">
        <AutoFormLabel v-if="!config?.hideLabel" :required="required">
          {{ config?.field?.text || config?.label || beautifyObjectName(label ?? fieldName) }}
        </AutoFormLabel>
        <Button size="xs" :icon="true" variant="ghost" >
          <FolderKanban class="size-4"/>
        </Button>
      </div>
      <FormControl>
        <slot v-bind="slotProps">
          <Popover @update:open="onChange">
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                class="border-dashed justify-start w-full"
                v-bind="{ ...slotProps.componentField, ...config?.inputProps }"
                :disabled="disabled">
                <CirclePlus class="size-4" />
                {{ config?.field?.text || config?.label || beautifyObjectName(label ?? fieldName) }}
                <template v-if="slotProps.value?.length > 0">
                  <Separator orientation="vertical" class="h-4" />
                  <Badge
                    variant="outline"
                    class="rounded-sm px-1 font-normal lg:hidden"
                  >
                  </Badge>
                  <div class="space-x-1 flex">
                    <Badge
                      v-if="slotProps.value.length > 5"
                      variant="outline"
                      class="rounded-sm px-1 font-normal"
                    >
                      {{ slotProps.value.length }} selected
                    </Badge>

                    <template v-else>
                      <Badge
                        v-for="(option, index) in getSelectedOptions(slotProps)"
                        :key="index"
                        variant="outline"
                        class="rounded-sm px-1 font-normal"
                      >
                        {{ beautifyObjectName(getValueByPath(option, dataSource.displayMember)) }}
                      </Badge>
                    </template>
                  </div>
                </template>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" class="z-50 p-0 min-w-40 w-[var(--radix-popper-anchor-width)]">
              <Command
                :filter-function="(list: any, term) => list.filter(i => getValueByPath(i, dataSource.displayMember).toLowerCase()?.includes(term)) "
              >
                <CommandInput :placeholder="config?.label || beautifyObjectName(label ?? fieldName)" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      v-for="(option, index) in options"
                      :key="index"
                      :value="option"
                      @select="toggleSelectItem(slotProps, option)"
                    >
                      <div
                        :class="cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isChecked(slotProps, option)
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible',
                        )"
                      >
                        <Check class="h-4 w-4" />
                      </div>
                      <span>{{ beautifyObjectName(getValueByPath(option, dataSource.displayMember)) }}</span>
                    </CommandItem>
                  </CommandGroup>

                  <template v-if="slotProps.value?.length > 0">
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        :value="{ label: 'Clear filters' }"
                        class="justify-center text-center"
                        @select="handleClearFilter(slotProps)"
                      >
                        Clear
                      </CommandItem>
                    </CommandGroup>
                  </template>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
