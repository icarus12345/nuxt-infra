<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { IEntity } from '@entities'
import { Check } from 'lucide-vue-next'
import { DataAdapter } from '@interfaces'


interface DataTableFacetedFilter {
  column: Column<IEntity, any>
}
const props = defineProps<DataTableFacetedFilter>()
const condition = computed(() => props.column.getFilterValue())
const meta = props.column.columnDef.meta
const options = ref([])
onMounted(async () => {
  const dataSource = meta.dataSource || meta.schema.source
  if (isAsyncFunction(dataSource)) {
    dataSource().then(data => options.value = meta.dataSource = data)
  } else if (dataSource instanceof Function) {
    options.value = meta.dataSource = dataSource()
  } else if (dataSource instanceof Array) {
    options.value = dataSource
  } else if (dataSource) {
    const dataAdapter = new DataAdapter(dataSource)
    const extraParms = dataSource.params || {}
    const params = { ... extraParms }
    const res = await dataAdapter.bind({ params })
    if (dataSource.beforeLoadComplete) {
      dataSource.beforeLoadComplete(res)
    }
    options.value = meta.dataSource = res.records
  }
})
const isAllSelected = computed(() => {
  return condition.value.value.length && options.value.length === condition.value.value.length
})
const isSomeSelected = computed(() => {
  return condition.value.value.length && options.value.length > condition.value.value.length
})
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    condition.value.value = []
  } else {
    condition.value.value = options.value.map(d => d.value)
  }
  props.column?.setFilterValue(condition.value)
}
const toggleSelectItem = (e) => {
  const option = e.detail.value
  const cond = condition.value
  const index = cond.value.indexOf(option.value)
  if (index >= 0) {
    cond.value.splice(index, 1)
  } else {
    cond.value.push(option.value)
  }
  props.column?.setFilterValue(condition.value)
}
</script>
<template>
  <Command
    class="rounded border border-dashed h-auto"
    :filter-function="(list: DataTableFacetedFilter['options'], term) => list.filter(i => i.label.toLowerCase()?.includes(term)) "
  >
    <CommandInput :placeholder="meta.text" :autoFocus="false"/>
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup>
        <CommandItem
          :value="{ label: 'Clear filters' }"
          @select="toggleSelectAll"
        >
          <div
            :class="cn(
              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
              {
                'bg-primary text-primary-foreground': isAllSelected,
              }
                // : 'opacity-50 [&_svg]:invisible',
            )"
          >
            <Check class="h-4 w-4" v-if="isAllSelected || isSomeSelected" />
          </div>
          (Select all)
        </CommandItem>
      </CommandGroup>
      <CommandGroup>
        <CommandItem
          v-for="option in options"
          :key="option.value"
          :value="option"
          @select="toggleSelectItem"
        >
          <div
            :class="cn(
              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
              condition.value.includes(option.value)
                ? 'bg-primary text-primary-foreground'
                : 'opacity-50 [&_svg]:invisible',
            )"
          >
            <Check class="h-4 w-4" />
          </div>
          <span>{{ option.label }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
