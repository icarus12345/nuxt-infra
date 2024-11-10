import { IUserAttribute, IRole, IUser } from "@entities";
import { DateFormat } from "@ui/utils";
import { UserRepository } from "@repositories";
import CellAction from "@components/crud/cell.action";
import { ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
import { IDataAdapter } from "@ui/components/crud";
import { IRepository } from "@/application/interfaces";
import { lazy } from "react";
import { RoleBadge } from "@components/widgets";

const detailComponent = lazy(() => import('@/ui/pages/dashboard/components/user.detail'))

export const MemberAdapter: IDataAdapter = {
  text: {
    title: 'Member management',
    addNew: 'New a Member',
  },
  source: {
    include: 'roles',
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
        headerName: 'Email',
        field: 'attributes.email',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        minWidth: 180,
      },
      {
        headerName: 'Roles',
        maxWidth: 180,
        filter: false,
        sortable: false,
        cellRenderer: RoleBadge,
        cellStyle: { display: 'flex', justifyContent: 'start', alignItems: 'center' }
      },
      {
        headerName: 'Active',
        field: 'attributes.active',
        cellDataType: 'boolean',
        filter: true,
        // floatingFilter: false,
        maxWidth: 96,
        editable: true,
        cellEditor: 'agCheckboxCellEditor',
        // cellEditor: "agSelectCellEditor",
        // cellEditorParams: {
        //   values: [true, false],
        // } as ISelectCellEditorParams,
      },
      {
        headerName: 'Created at',
        field: 'attributes.createdAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        maxWidth: 128,
        valueFormatter: (params: ValueFormatterParams<IUser>) => DateFormat(params.value)
      },
      {
        headerName: 'Updated at',
        field: 'attributes.updatedAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        valueFormatter: (params: ValueFormatterParams<IUser>) => DateFormat(params.value),
        maxWidth: 128,
        resizable: false,
      },
      {
        headerName: "",
        cellRenderer: CellAction,
        cellRendererParams: {
          repository: UserRepository,
          detailComponent
        },
        pinned: 'right',
        resizable: false,
        maxWidth: 36,
      },
    ],
    
  },
  detailComponent,
  repository: UserRepository,
  rowSelection: 'multiple',
  softDelete: true,
}