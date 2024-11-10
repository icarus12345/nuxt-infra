import { IComment, ICommentAttribute } from "@entities";
import { DateFormat } from "@ui/utils";
import { CommentRepository } from "@repositories";
import CellAction from "@components/crud/cell.action";
import { ValueFormatterParams } from "ag-grid-community";
import { DetailDialog, IDataAdapter } from "@ui/components/crud";
import { IRepository } from "@/application/interfaces";
import { lazy } from "react";

export const CommentAdapter: IDataAdapter<IRepository<IComment, ICommentAttribute>> = {
  text: {
    title: 'Comments management',
    addNew: 'New a Comments',
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
        headerName: 'Created at',
        field: 'attributes.createdAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        maxWidth: 128,
        valueFormatter: (params: ValueFormatterParams<IComment>) => DateFormat(params.value)
      },
      {
        headerName: 'Updated at',
        field: 'attributes.updatedAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        valueFormatter: (params: ValueFormatterParams<IComment>) => DateFormat(params.value),
        maxWidth: 128,
        resizable: false,
      },
      {
        headerName: "",
        cellRendererParams: {
          // onClick: onClick,
        },
        pinned: 'right',
        resizable: false,
        maxWidth: 36,
      },
    ],
    
  },
  detailComponent: lazy(() => import('@pages/dashboard/components/comment-detail')),
  repository: CommentRepository ,
  rowSelection: 'multiple'
}