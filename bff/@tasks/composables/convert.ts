import { h } from 'vue'
import { ColumnDef } from "@tanstack/vue-table";
import { IEntity } from "@entities";
import { Column, Field } from "@interfaces";
import Checkbox from '@/components/ui/checkbox/CheckBox.vue';
import DataTableRowActions from '@tasks/components/DataTableRowActions.vue';
import { FieldSchema } from '../../@application/interfaces/data-source';

export function convertColumnDef<T>(columns: Column[]): ColumnDef<T>[] {
  return columns.map(column => {
    const field = column.displayField || column.dataField
    const columnDef: ColumnDef<T> = {
      // id: column.dataField,
      header: column.text,
      enableSorting: !!column.sortable,
      enableColumnFilter: !!column.filterable,
      // filterType: 'Textbox' | 'Input' | 'CheckedList' | 'List' | 'Number' | 'Checkbox' | 'Date' | 'Range'
      // filterCondition: string
      // filterItems: any
      enableHiding: !!column.hideable,
      // hide,
      // renderer,
      // cellsRenderer,
      // cellsFormat,
      // align,
      // createFilterWidget,
      // createFilterPanel,
      size: column.width,
      minSize: column.minWidth,
      maxSize: column.maxWidth,
      // resizable,
      // draggable,
      // editable,
      // className,
      // cellsClassName,
      // pinned,
      meta: column,
      enablePinning: !!column.pinned,
    }

    if (column.fieldType === 'Selection') {
      columnDef.id = 'select'
      columnDef.header = ({ table }) => h(Checkbox, {
        'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all',
        'class': 'translate-y-0.5',
      })
      columnDef.cell = ({ row }) => h(Checkbox, {
        'checked': row.getIsSelected(),
        'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' 
      })
      columnDef.enableSorting = false
      columnDef.enableHiding = false
    } else if (column.fieldType === 'Action') {
      columnDef.id = 'action'
      if (column.cellsRenderer) {
        columnDef.cell = column.cellsRenderer
      } else {
        columnDef.cell = ({ row }) => h(DataTableRowActions, { row })
      }
      columnDef.enableSorting = false
      columnDef.enableHiding = false
    } else {
      columnDef.accessorKey = column.dataField
      columnDef.accessorFn = (row: any, index: number) => cellFormat(getValueByPath(row, field), column.cellsFormat)
    }

    if (column.cellsRenderer) {
      columnDef.cell = column.cellsRenderer
    }
    return columnDef;
  })
}
