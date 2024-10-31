import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, RowSelectedEvent, RowSelectionOptions, SelectionChangedEvent, SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import { useCallback, useMemo, useState } from "react";
import PopoverDropdown from "./popover";
import MenubarDemo from "./mebu-bar";

interface ABC {
  dates: string[]
}

interface DDD {
  d: ABC
}

export default function Table() {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([]);

  const onGridReady = useCallback((event: GridReadyEvent) => {
    // setGridApi(event);
    console.log(event)
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const columnDefs = useMemo<ColDef[]>(() => {
    return [
      {
        field: 'athlete',
        minWidth: 150,
      },
      {
        field: 'age',
        maxWidth: 90,
      },
      {
        field: 'country',
        minWidth: 150,
      },
      { field: 'total' },
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
          event.node.data.athlete,
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
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        autoSizeStrategy={autoSizeStrategy}
        rowSelection={rowSelection}
        onGridReady={onGridReady}
        onRowSelected={onRowSelected}
        onSelectionChanged={onSelectionChanged}
        />
      <PopoverDropdown />
      </div>
    </>
  );
}