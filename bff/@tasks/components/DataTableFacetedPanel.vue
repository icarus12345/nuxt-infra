<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { IEntity } from '@entities'
import { ListFilter } from 'lucide-vue-next';
import { computed } from 'vue';

interface DataTableColumnHeaderProps {
  column: Column<IEntity, any>
}

const props = defineProps<DataTableColumnHeaderProps>()
const condition = computed(() => props.column.getFilterValue())
const isFilltered = computed(() => {
  const filterType = props.column.columnDef.meta.filterType
  if (['CheckList','TagsInput'].includes(filterType)) {
    return condition.value.value.length > 0
  }
  if (['blank', 'notBlank'].includes(condition.value.operator)) {
    return true
  }
  return condition.value.value
})
</script>
<template>
  <Popover>
      <PopoverTrigger as-child>
        <Button
          variant="ghost"
          size="xs"
          :icon="true"
          class="relative"
          v-if="column.getCanFilter()"
          >
          <ListFilter class="size-4 text-muted-foreground" />
          <span class="absolute size-1.5 top-0.5 right-0.5 rounded-full bg-primary" v-if="isFilltered"></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-60 p-3 z-50" align="start">
        <DataTableFacetedTagsInputFilter
          v-if="column.columnDef.meta.filterType === 'TagsInput'"
          :column="column"
          :title="column.columnDef.meta.text"
        />
        <DataTableFacetedCheckListFilter
          v-else-if="column.columnDef.meta.filterType === 'CheckList'"
          :column="column"
          :title="column.columnDef.meta.text"
        />
        <DataTableFacetedNumberFilter
          v-else-if="column.columnDef.meta.filterType === 'Number'"
          :column="column"
          :title="column.columnDef.meta.text"
        />
        <DataTableFacetedDateFilter
          v-else-if="column.columnDef.meta.filterType === 'Date'"
          :column="column"
          :title="column.columnDef.meta.text"
        />
        <DataTableFacetedTextFilter
          v-else
          :column="column"
          :title="column.columnDef.meta.text"
        />
      </PopoverContent>
    </Popover>
</template>