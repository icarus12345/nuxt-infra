import { IPermission, IPermissionAttribute } from "@entities";
import { DateFormat } from "@ui/utils";
import { PermissionRepository } from "@repositories";
import CellAction from "@components/crud/cell.action";
import { ValueFormatterParams } from "ag-grid-community";
import { DetailDialog, IDataAdapter } from "@ui/components/crud";
import { IRepository } from "@/application/interfaces";
import { lazy } from "react";

export const PermissionAdapter: IDataAdapter<IRepository<IPermission, IPermissionAttribute>> = {
  text: {
    title: 'Permission management',
    addNew: 'New a Permission',
  },
  source: {
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
        headerName: 'Created at',
        field: 'attributes.createdAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        maxWidth: 128,
        valueFormatter: (params: ValueFormatterParams<IPermission>) => DateFormat(params.value)
      },
      {
        headerName: 'Updated at',
        field: 'attributes.updatedAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        valueFormatter: (params: ValueFormatterParams<IPermission>) => DateFormat(params.value),
        maxWidth: 128,
        resizable: false,
      },
      {
        headerName: "",
        cellRenderer: CellAction,
        cellRendererParams: {
          // onClick: onClick,
        },
        pinned: 'right',
        resizable: false,
        maxWidth: 36,
      },
    ],
    
  },
  detailComponent: lazy(() => import('@pages/dashboard/components/role-detail')),
  repository: PermissionRepository ,
  rowSelection: 'multiple'
}