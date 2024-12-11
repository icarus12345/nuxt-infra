<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { IEntity } from '@entities'
import { Search } from 'lucide-vue-next'
const $DataTable = inject('DataTable')
interface DataTableFacetedFilter {
  column: Column<IEntity, any>
  title?: string
}

const props = defineProps<DataTableFacetedFilter>()
const condition = computed(() => props.column.getFilterValue())
const operators = ['equals', 'notEquals', 'contains', 'notContains', 'startsWith', 'endsWith', 'blank', 'notBlank', 'in', 'notIn']
const handleInput = ($event) => {
  condition.value.value = $event.target.value
  props.column.setFilterValue(condition.value)
}
const onOperatorChange = (operator) => {
  if(['blank', 'notBlank'].includes(operator)) {
    $DataTable.applyFilter()
  } else if(condition.value.value) {
    $DataTable.applyFilter()
  }
}
</script>
<template>
  <div class="space-y-1">
    <Select defaultValue="contains" v-model="condition.operator" @update:modelValue="onOperatorChange">
      <SelectTrigger>
        <SelectValue placeholder="Contains" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem :value="operator" v-for="(operator, index) of operators" :key="index">{{operator}}</SelectItem>
      </SelectContent>
    </Select>
    <div class="relative items-center" v-if="!['blank', 'notBlank'].includes(condition.operator)">
      <Input
        placeholder="Filter..."
        :model-value="condition.value"
        @input="handleInput"
        class="pl-8"
      />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-4 text-muted-foreground" />
      </span>
    </div>
  </div>
</template>
