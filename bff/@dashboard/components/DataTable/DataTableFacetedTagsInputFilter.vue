<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { IEntity } from '@entities'
import { DataAdapter } from '@interfaces'
import { Check, CirclePlus } from 'lucide-vue-next'

const $DataTable = inject('DataTable')
interface DataTableFacetedFilter {
  column: Column<IEntity, any>
}
const props = defineProps<DataTableFacetedFilter>()
const condition = computed(() => props.column.getFilterValue())
const meta = props.column.columnDef.meta
const valueMember = computed(() => {
  const dataSource = meta.dataSource || meta.schema.source
  return dataSource.valueMember || 'value'
})
const displayMember = computed(() => {
  const dataSource = meta.dataSource || meta.schema.source
  return dataSource.displayMember || 'label'
})
const options = ref([])
const oldValue = ref()
onMounted(async () => {
  const dataSource = meta.dataSource || meta.schema.source
  if (isAsyncFunction(dataSource)) {
    dataSource().then(data => options.value = meta.dataSource = data)
  } else if (dataSource instanceof Function) {
    options.value = meta.dataSource = dataSource()
  } else if (dataSource instanceof Array) {
    options.value = dataSource
  } else if (dataSource.data instanceof Array) {
    options.value = dataSource.data
  } else if (dataSource) {
    const dataAdapter = new DataAdapter(dataSource)
    const extraParms = dataSource.params || {}
    const params = { ... extraParms }
    const res = await dataAdapter.bind({ params })
    if (dataSource.beforeLoadComplete) {
      dataSource.beforeLoadComplete(res)
    }
    options.value = meta.dataSource.data = res.records
  }
})
const onChange = (state) => {
  if (state) {
    oldValue.value = JSON.stringify(condition.value)
  } else {
    if (oldValue.value !== JSON.stringify(condition.value)) {
      $DataTable.applyFilter()
    }
  }
}

const toggleSelectItem = (e) => {
  const option = e.detail.value
  const cond = condition.value
  const v = getValueByPath(option, valueMember.value)
  const index = cond.value.indexOf(v)
  if (index >= 0) {
    cond.value.splice(index, 1)
  } else {
    cond.value.push(v)
  }
  props.column.setFilterValue(condition.value)
}
const handleClearFilter = () => {
  condition.value.value = []
  props.column.setFilterValue(condition.value)
}
const tags = computed(() => options.value.filter((option) => condition.value.value.includes(getValueByPath(option, valueMember.value))))
const applyFilter = (v) => {
  props.column.setFilterValue(condition.value)
}
</script>

<template>
  
  <Popover @update:open="onChange">
    <div class="flex">
      <TagsInput v-model="condition.value" class="p-1 border-dashed w-full" @update:modelValue="applyFilter">
        <PopoverTrigger as-child>
          <Button variant="outline" class="border-dashed justify-start" size="xs">
            <CirclePlus class="size-4" />
            {{ meta.text }}
          </Button>
        </PopoverTrigger>
        <TagsInputItem v-for="item in tags" :key="item" :value="getValueByPath(item, valueMember)">
          <TagsInputItemText>
            {{ getValueByPath(item, displayMember) }}
          </TagsInputItemText>
          <TagsInputItemDelete />
        </TagsInputItem>
      </TagsInput>
    </div>
    <PopoverContent align="start" class="p-0 min-w-40 w-[var(--radix-popper-anchor-width)]">
      <Command
        :filter-function="(list: DataTableFacetedFilter['options'], term) => list.filter(i => getValueByPath(i, displayMember).toLowerCase()?.includes(term)) "
      >
        <CommandInput :placeholder="meta.text" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="getValueByPath(option, valueMember)"
              :value="option"
              @select="toggleSelectItem"
            >
              <div
                :class="cn(
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  condition.value.includes(getValueByPath(option, valueMember))
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible',
                )"
              >
                <Check class="h-4 w-4" />
              </div>
              <span>{{ getValueByPath(option, displayMember) }}</span>
            </CommandItem>
          </CommandGroup>

          <template v-if="condition.value.length > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="handleClearFilter"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
