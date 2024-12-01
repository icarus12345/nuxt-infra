<script setup lang="ts">
import { ListFilter, Search, Undo2, ChevronDown } from 'lucide-vue-next';
const $DataTable = inject('DataTable')
const table = $DataTable.table
const globalFilter = table.getState().globalFilter
const filterColumns = table.getAllColumns()
  .filter(
    column => typeof column.accessorFn !== 'undefined' && column.columnDef.meta?.filterable,
  )
</script>

<template>
  <div class="p-3 flex flex-col gap-3 flex-1 overflow-y-auto">
    <div class="flex-1 flex flex-col gap-4">
      <div class="relative max-w-sm items-center">
        <Input
          placeholder="Search keyword"
          :model-value="globalFilter"
          class="pl-8"
          @input="table.setGlobalFilter($event.target.value)"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>
      <Collapsible
        v-for="(column, index) of filterColumns"
        :key="index"
        :default-open="true"
        class="group"
      >
        <div class="flex items-center gap-2 mb-2">
          <CollapsibleTrigger as-child>
            <Button variant="ghost" size="xs" :icon="true" class="rounded-xs">
              <ChevronDown class="size-4 group-data-[state=closed]:-rotate-90" />
            </Button>
          </CollapsibleTrigger>
          {{column.columnDef.meta.text}}
        </div>
        <CollapsibleContent class="ms-6">
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
        </CollapsibleContent>
      </Collapsible>
    </div>
    <div class="flex justify-between sticky bottom-0 z-10">
      <Button
        variant="soft"
        @click="$DataTable.applyFilter"
      >
        <ListFilter class="size-4" />
        Apply
      </Button>
      
      <Button
        :disabled="!$DataTable.hasFiltered"
        variant="link"
        @click="$DataTable.resetFilter"
      >
        Reset
        <Undo2 class="size-4" />
      </Button>
     
    </div>
  </div>
</template>
