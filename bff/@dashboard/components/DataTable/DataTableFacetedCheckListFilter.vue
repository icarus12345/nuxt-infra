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
const valueMember = computed(() => {
  const dataSource = meta.dataSource || meta.schema.source
  return dataSource.valueMember || 'value'
})
const displayMember = computed(() => {
  const dataSource = meta.dataSource || meta.schema.source
  return dataSource.displayMember || 'label'
})
const options = ref([])
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
    condition.value.value = options.value.map(d => getValueByPath(d, valueMember.value))
  }
  props.column?.setFilterValue(condition.value)
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
  props.column?.setFilterValue(condition.value)
}
</script>
<template>
  {{ valueMember }} {{ displayMember }}
  <Command
    class="rounded border border-dashed h-auto"
    :filter-function="(list: DataTableFacetedFilter['options'], term) => list.filter(i => getValueByPath(i, displayMember).toLowerCase()?.includes(term)) "
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
          <span>{{ camelCase(getValueByPath(option, displayMember)) }}</span>
          
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
