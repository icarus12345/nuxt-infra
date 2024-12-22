<script setup lang="ts">
import { Plus, Search, Undo2 } from 'lucide-vue-next';

const $Dialog = useDialog()
const $DataTable = inject('DataTable')
const table = $DataTable.table
const globalFilter = table.getState().globalFilter
const hasFiltered = computed(() => {
  return $DataTable.hasFiltered.value
})

const showAddEntryDialog = () => {
  const DetailDialog = defineAsyncComponent(() => import('../DetailDialog.vue'))
  $Dialog.show({
    component: shallowRef(DetailDialog),
    props: {
      content: {
        trapFocus: false,
        // disableOutsidePointerEvents: false,
        schema: $DataTable.schema,
        source: $DataTable.source,
      }
    },
    okText: 'Save',
    callback() {
      $DataTable.refresh()
    }
  })
}

const quickFilterColumns = computed(() => table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanFilter() && column.columnDef.meta.quickFilter,
  ))
</script>

<template>
  <div class="flex items-center justify-between gap-2">
    <div class="flex flex-1 items-center gap-2">
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
      <div v-for="(column, index) in quickFilterColumns" :key="index">
        <DataTableFacetedFilter :column="column"/>
      </div>
      <Button
        v-if="hasFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3 max-lg:hidden"
        @click="$DataTable.resetFilter"
      >
        Reset
        <Undo2 class="size-4" />
      </Button>
    </div>
    <Button variant="soft" color="primary" @click="showAddEntryDialog" v-permission="$DataTable.permissions.create"><Plus/> Add</Button>
    <DataTableViewOptions/>
  </div>
</template>
