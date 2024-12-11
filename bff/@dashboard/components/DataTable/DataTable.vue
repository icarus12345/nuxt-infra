<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFilter,
  ColumnFiltersState,
  SortingState,
  TableState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useVueTable,
} from '@tanstack/vue-table'
import { watchDebounced } from '@vueuse/core'
import { IDataSource, Column, DataAdapter, FieldSchema } from '@interfaces'
import { type DataTableVariants, dataTableVariants } from './theme'
import type { HTMLAttributes } from 'vue'
import { ISchema } from '../../data/schema'

interface DataTableProps {
  schema: ISchema,
  variant?: DataTableVariants['variant']
  props?: {
    table?: {
      class?: HTMLAttributes['class']
    }
  }
}
const props = defineProps<DataTableProps>()

const columns = convertColumnDef(props.schema.columns);
const source = props.schema.source;
const loading = ref<boolean>(false)
const defaultFiltersState:ColumnFilter[] = []
const visibilityState = {}
const pinningState = {
  left: [],
  right: [],
  position: {},
  width: {},
}
const defaultOperator = {
  TagsInput: 'in',
  CheckList: 'in',
  Date: 'equals',
  Number: 'contains',
}
columns.forEach((columnDef) => {
  const key = columnDef.id || columnDef.meta.dataField
  const hidden = columnDef.meta.hidden !== true
  if (key) {
    visibilityState[key] = hidden
  }
  if (columnDef.meta.pinned === 'left') {
    const prev = pinningState.left[pinningState.left.length - 1]
    const pos = pinningState.position[prev] || 0;
    const width = pinningState.width[prev] || 0;
    pinningState.position[key] = pos + width
    pinningState.width[key] = columnDef.meta.width
    pinningState.left.push(key)
  }
  if (columnDef.meta.pinned === 'right') {
    const prev = pinningState.right[pinningState.right.length - 1]
    const pos = pinningState.position[prev] || 0;
    const width = pinningState.width[prev] || 0;
    pinningState.position[key] = pos + width
    pinningState.right.push(key)
  }
  if (columnDef.meta.filterable) {
    const filterType = columnDef.meta.filterType
    defaultFiltersState.push({
        id: key,
        value: {
          operator: defaultOperator[filterType] || 'contains',
          value: ['CheckList','TagsInput'].includes(filterType) ? [] : '',
        }
      })
  }
})
const sorting = ref<SortingState>([])
const columnVisibility = ref<VisibilityState>(visibilityState)
const columnPinning = ref<ColumnPinningState>(pinningState)
const rowSelection = ref({})
const data = ref([]);
const rowCount = ref(0);
const totalRows = ref(0);
const pagination = ref({
  pageIndex: 0,
  pageSize: 50,
});
const globalFilter = ref("");
const columnFilters = ref<ColumnFiltersState>(JSON.parse(JSON.stringify(defaultFiltersState)))
const table = useVueTable({
  defaultColumn: {
    size: 100, //starting column size
    minSize: 0, //enforced during column resizing
    maxSize: 240,
  },
  getRowId: (row) => row.id,
  get data() { return data.value },
  get columns() { return columns },
  state: {
    get sorting() { return sorting.value },
    get globalFilter() { return globalFilter.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get columnPinning() { return columnPinning.value },
    get rowSelection() { return rowSelection.value },
    get pagination() { return pagination.value }
  },
  initialState: pagination.value,
  enableRowSelection: true,
  onGlobalFilterChange: updaterOrValue => valueUpdater(updaterOrValue, globalFilter),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onPaginationChange: updaterOrValue => valueUpdater(updaterOrValue, pagination),
  manualPagination: true,
  get rowCount() { return rowCount.value },
  getCoreRowModel: getCoreRowModel(),
  // getPaginationRowModel: getPaginationRowModel(),
  // getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
})

const getPinnedPos = ({columnDef}) => {
  const key = columnDef.id || columnDef.meta?.dataField
  return pinningState.position[key] || 0;
}
const dataAdapter = new DataAdapter(source)
const fetchData = async () => {
  let sort, filter = {
  };
  const extraParms = source.params || {}
  if (sorting.value[0]) {
    sort = `${sorting.value[0].desc ? '-' : ''}${sorting.value[0].id}`
  }
  columnsHasFiltered.value
    .map((columnFilter => {
      const condition = {...columnFilter.value}
      if (['blank', 'notBlank'].includes(condition.operator)) {
        condition.value = true
      }
      if (extraParms.include?.includes(columnFilter.id)) {
        filter[columnFilter.id] = {
          id: condition
        }
      } else {
        filter[columnFilter.id] = condition
      }
    }))
  if (globalFilter.value) {
    filter['q'] = globalFilter.value
  }
  loading.value = true
  try {
    const params = {
      q: globalFilter.value,
      sort,
      filter,
      page: {
        number: pagination.value.pageIndex + 1,
        size: pagination.value.pageSize,
      },
      ...extraParms
    }
    if (source.beforeSend) {
      source.beforeSend(params)
    }
    const res = await dataAdapter.bind(params)
    if (source.beforeLoadComplete) {
      source.beforeLoadComplete(res)
    }
    rowCount.value = res.total
    data.value = res.records
  } finally {
    loading.value = false;
  }
}
watch(
  [sorting],
  () => {
    table.setPageIndex(0)
  }
)
watchDebounced(
  [globalFilter, columnFilters],
  () => {
    table.setPageIndex(0)
  },
  { debounce: 500, maxWait: 2000 },
)
watch(
  [pagination],
  () => fetchData()
)
const columnsHasFiltered = computed(() => {
  return columnFilters.value.filter(
    (filter) => {
      const condition = filter.value
      if (['blank', 'notBlank'].includes(condition.operator)) {
        return true;
      }
      if (condition.value instanceof Array || condition.value instanceof String) {
        return condition.value.length > 0
      }
      return condition.value
    })
})
const cacheFiltered = ref()

const hasFiltered = computed(() => {
  return columnsHasFiltered.value.length > 0
})
onMounted(() => {
  fetchData()
  cacheFiltered.value = JSON.stringify(columnFilters.value)

})
const applyFilter = () => {
  if (hasFiltered.value) {
    table.setPageIndex(0)
  }
}
const refresh = () => {
  table.setPageIndex(pagination.value.pageIndex)
}
provide('DataTable', {
  table,
  hasFiltered,
  columnsHasFiltered,
  applyFilter,
  resetFilter() {
    columnFilters.value = JSON.parse(JSON.stringify(defaultFiltersState))
    table.setColumnFilters(columnFilters.value)
  },
  dataAdapter,
  refresh,
  schema: props.schema.schema,
  source: props.schema.source,
  permissions: props.schema.permissions,
})
</script>

<template>
  <div class="space-y-3" v-permission="schema.permissions.view">
    <DataTableToolbar/>
    <ScrollArea :class="[
      dataTableVariants({variant}),
      'data-table-scroller'
    ]">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :class="{
                'sticky z-[2]': header.column.columnDef.meta?.pinned,
              }"
              :style="{
                minWidth: (header.column.columnDef.minSize || header.column.columnDef.size) + 'px',
                maxWidth: (header.column.columnDef.maxSize  || header.column.columnDef.size) + 'px',
                width: header.column.columnDef.size + 'px',
                left: header.column.columnDef.meta?.pinned == 'left' ? getPinnedPos(header.column) + 'px': null,
                right: header.column.columnDef.meta?.pinned == 'right' ? getPinnedPos(header.column) + 'px': null,
              }">
              <DataTableColumnHeader :column="header.column" v-if="header.column.columnDef.enableSorting !== false || header.column.columnDef.enableHiding !== false"/>
              <FlexRender v-else="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody :class="{
          'opacity-50': loading
        }">
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="{
                  'sticky z-[1]': cell.column.columnDef.meta?.pinned,
                }"
                :style="{
                  left: cell.column.columnDef.meta?.pinned == 'left' ? getPinnedPos(cell.column) + 'px': null,
                  right: cell.column.columnDef.meta?.pinned == 'right' ? getPinnedPos(cell.column) + 'px': null,
                }"
                >
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center text-muted-foreground"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <!--
      <DataTableSetting/>
      -->
    </ScrollArea>
    <DataTablePagination/>
  </div>
</template>
