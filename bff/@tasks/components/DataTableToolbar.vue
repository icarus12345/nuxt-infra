<script setup lang="ts">
import { actives, roles } from '../data/data'
import { Search, Undo2 } from 'lucide-vue-next';
const $DataTable = inject('DataTable')
const table = $DataTable.table
const globalFilter = table.getState().globalFilter
const hasFiltered = computed(() => {
  return $DataTable.hasFiltered.value
})
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <div class="relative max-w-sm items-center">
        <Input
          placeholder="Search keyword"
          :model-value="globalFilter"
          class="pl-8 w-[160px] lg:w-[240px]"
          @input="table.setGlobalFilter($event.target.value)"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>
      <div v-if="table.getColumn('roles')">
        <DataTableFacetedFilter
          :column="table.getColumn('roles')"
          title="Roles"
          :options="roles"
        />
      </div>
      <div v-if="table.getColumn('active')">
        <DataTableFacetedFilter
          :column="table.getColumn('active')"
          title="Status"
          :options="actives"
        />
      </div>
      <Button
        v-if="hasFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="$DataTable.resetFilter"
      >
        Reset
        <Undo2 class="size-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
