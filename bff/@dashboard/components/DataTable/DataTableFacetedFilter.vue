<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { IEntity } from '@entities'
import { Check } from 'lucide-vue-next'
import { DataAdapter } from '@interfaces'
import { CirclePlus } from 'lucide-vue-next'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const $DataTable = inject('DataTable')
interface DataTableFacetedFilter {
  column?: Column<IEntity, any>
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
const loadData = async () => {
  if (options.value.length) return
  const dataSource = meta.dataSource
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
}
const onChange = (state) => {
  if (state) {
    loadData()
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
  props.column?.setFilterValue(condition.value)
}
const handleClearFilter = () => {
  condition.value.value = []
  props.column?.setFilterValue(condition.value)
}
const tags = computed(() => options.value.filter((option) => condition.value.value.includes(getValueByPath(option, valueMember.value))))
const breakpoints = useBreakpoints(breakpointsTailwind)
</script>

<template>
  <Popover @update:open="onChange">
    <PopoverTrigger as-child>
      <Button variant="outline" class="border-dashed justify-start w-full max-lg:hidden">
        <CirclePlus class="size-4" />
        {{ meta.text }}
        <template v-if="condition.value.length > 0">
          <Separator orientation="vertical" class="h-4" />
          <Badge
            variant="outline"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ condition.value.length }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="condition.value.length > 2"
              variant="outline"
              class="rounded-sm px-1 font-normal"
            >
              {{ condition.value.length }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="option in tags"
                :key="getValueByPath(option, valueMember)"
                variant="outline"
                class="rounded-sm px-1 font-normal"
              >
                {{ camelCase(getValueByPath(option, displayMember)) }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
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
                    : '[&_svg]:invisible',
                )"
              >
                <Check class="h-4 w-4" />
              </div>
              <span>{{ camelCase(getValueByPath(option, displayMember)) }}</span>
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
