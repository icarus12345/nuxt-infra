import { IRoleAttribute, IRole } from "@entities";
import { DateFormat } from "@ui/utils";
import { RoleRepository } from "@repositories";
import CellAction from "@components/crud/cell.action";
import { ValueFormatterParams } from "ag-grid-community";
import { IDataAdapter } from "@ui/components/crud";
import { IRepository } from "@/application/interfaces";
import { lazy } from "react";
const detailComponent = lazy(() => import('@/ui/pages/dashboard/components/role-detail'))
export const RoleAdapter: IDataAdapter = {
  text: {
    title: 'Role management',
    addNew: 'New a Role',
  },
  source: {
    include: 'permissions',
    dataFields: [
      {
        field: 'id',
        filter: 'agNumberColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        maxWidth: 72,
        resizable: false,
      },
      {
        headerName: 'Name',
        field: 'attributes.name',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        maxWidth: 180,
        editable: true,
        cellEditor: 'agTextCellEditor',
        cellClass: 'capitalize',
        cellEditorParams: {
          maxLength: 50
        },
      },
      {
        headerName: 'Guard',
        field: 'attributes.guardName',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        minWidth: 180,
      },
      {
        headerName: 'Permissions',
        field: 'relationships.permissions.data.length',
        maxWidth: 180,
        filter: false,
        sortable: false,
        // valueFormatter: (params: ValueFormatterParams<IRole>) => params.value?.relationships?.permissions.data.length
      },
      {
        headerName: 'Created at',
        field: 'attributes.createdAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        maxWidth: 128,
        valueFormatter: (params: ValueFormatterParams<IRole>) => DateFormat(params.value)
      },
      {
        headerName: 'Updated at',
        field: 'attributes.updatedAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        valueFormatter: (params: ValueFormatterParams<IRole>) => DateFormat(params.value),
        maxWidth: 128,
        resizable: false,
      },
      {
        headerName: "",
        cellRenderer: CellAction,
        cellRendererParams: {
          repository: RoleRepository,
          detailComponent
        },
        pinned: 'right',
        resizable: false,
        maxWidth: 36,
      },
    ],
    
  },
  detailComponent,
  repository: RoleRepository,
  rowSelection: 'multiple'
}