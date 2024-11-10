import { IPostAttribute, IPost } from "@entities";
import { DateFormat } from "@ui/utils";
import { PostRepository } from "@repositories";
import CellAction from "@components/crud/cell.action";
import { ValueFormatterParams } from "ag-grid-community";
import { DetailDialog, IDataAdapter } from "@ui/components/crud";
import { IRepository } from "@/application/interfaces";
import { lazy } from "react";

export const PostAdapter: IDataAdapter<IRepository<IPost, IPostAttribute>> = {
  text: {
    title: 'Post management',
    addNew: 'New a Post',
  },
  source: {
    include: 'comments',
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
        valueFormatter: (params: ValueFormatterParams<IPost>) => DateFormat(params.value)
      },
      {
        headerName: 'Updated at',
        field: 'attributes.updatedAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        valueFormatter: (params: ValueFormatterParams<IPost>) => DateFormat(params.value),
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
  detailComponent: lazy(() => import('@pages/dashboard/components/post-detail')),
  repository: PostRepository ,
  rowSelection: 'multiple'
}