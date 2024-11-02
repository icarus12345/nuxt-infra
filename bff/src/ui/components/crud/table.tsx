import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, IDatasource, RowSelectedEvent, RowSelectionOptions, SelectionChangedEvent, SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import { useCallback, useMemo, useState } from "react";
import PopoverDropdown from "./popover";
import MenubarDemo from "./mebu-bar";
import { $UserRepository } from "@repositories";
import { Role, User } from "@entities";
import { IResource } from "@interfaces";

export default function Table() {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState<User[]>([]);

  const onGridReady = useCallback((event: GridReadyEvent) => {
    // setGridApi(event);

    // $UserRepository.fetchUsers()
    //   .then((users: User[]) => {
    //     console.log(users)
    //     setRowData(users)
    //   });
  }, []);

  const datasource: IDatasource = {
    // called by the grid when more rows are required
    getRows(params) {
      $UserRepository.fetchUsers(params)
        .then((resource: IResource<User[]>) => params.successCallback(resource.items, resource.total))
    }
};

  const columnDefs = useMemo<ColDef[]>(() => {
    return [
      {
        field: 'id',
        filter: 'agNumberColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        maxWidth: 80,
      },
      {
        headerName: 'Name',
        field: 'attributes.name',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        maxWidth: 180,
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
        minWidth: 180,
        filter: false,
        sort: false,
        valueGetter: function(params) {
          return params?.data?.roles.map((role: Role) => role.attributes.display)
        },
      },
      {
        headerName: 'Created at',
        field: 'attributes.createdAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
      },
      {
        headerName: 'Updated at',
        field: 'attributes.updatedAt',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'reset'],
        },
        resizable: false,
      },
    ];
  }, []);
  const defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  const autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 80,
  }

  const rowSelection = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    // return { mode: "singleRow" };
    return { mode: "multiRow" };
  }, []);

  const onRowSelected = useCallback(
    (event: RowSelectedEvent) => {
      console.log(
          event.node.data,
          event.node.isSelected(),
      );
    },
    [],
  );

  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    // const selectedData = gridApi.getSelectedRows();
    console.log('Selection Changed', event);
  }, []);

  return (
    <>
      <MenubarDemo />
      <div
         // applying the Data Grid theme
        style={{ height: 'calc(100dvh - 200px)' }} // the Data Grid will fill the size of the parent container
      >

      <AgGridReact className="ag-theme-quartz"
        datasource={datasource}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        autoSizeStrategy={autoSizeStrategy}
        rowSelection={rowSelection}
        rowModelType="infinite"
        onGridReady={onGridReady}
        onRowSelected={onRowSelected}
        onSelectionChanged={onSelectionChanged}
        paginationAutoPageSize={false}
        pagination={true}
        />
      <PopoverDropdown />
      </div>
    </>
  );
}