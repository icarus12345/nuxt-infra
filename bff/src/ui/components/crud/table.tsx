import { AgGridReact } from "ag-grid-react";
import { CellValueChangedEvent, ColDef, GridApi, GridOptions, GridReadyEvent, IDatasource, RowSelectedEvent, RowSelectionOptions, SelectionChangedEvent, SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IAttribute, IEntity } from "@entities";
import { IConditions, IResource, IResourceList } from "@interfaces";
import { Button, DropdownMenu, Flex, Grid, SegmentedControl } from "@radix-ui/themes";
import { useCrudStore } from "./crud.hooks";
import { useDialog } from "@/ui/store";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { IDataAdapter } from ".";

const Table: FC<{ adapter: IDataAdapter }> = ( { adapter }) => {
  const dialog = useDialog();
  const { selectedRows, setSelectedRows } = useCrudStore()
  const [gridApi, setGridApi] = useState<GridApi>();
  const [segmented, setSegmented] = useState<string>('all');

  const onGridReady = useCallback((event: GridReadyEvent) => {
    setGridApi(event.api);
  }, []);

  const datasource: IDatasource = useMemo<IDatasource>(() => ({
    // called by the grid when more rows are required
    getRows(params) {
      setSelectedRows([]);
      const cond: IConditions = {
        ...params,
        archived: adapter.softDelete ? segmented === 'archived' : undefined,
        include: adapter.source.include,
      } as IConditions
      adapter.repository.fetch(cond)
        .then((resource: IResourceList<IEntity>) => params.successCallback(resource.data, resource.meta?.page.total))
    }
  }), [segmented]);

  const columnDefs = useMemo<ColDef[]>(() => {
    return adapter.source.dataFields;
  }, []);
  const defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  const autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 80,
  }

  const onRowSelected = useCallback((event: RowSelectedEvent) => {
    const selectedRows = event.api.getSelectedRows();
    setSelectedRows(selectedRows);
    console.log(selectedRows);
  }, []);
  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    console.log('Selection Changed', event);
  }, []);

  const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    const value = event.newValue;
    const rowId = event.data.id; // Giả sử `id` là trường ID của hàng
    const colId: string = String(event.colDef.field).replace('attributes.', '')
    console.log(colId, rowId, value, event);
    adapter.repository
      .patch<IEntity>({
        id: rowId,
        attributes: {
          [colId]: value
        }
      } as IEntity)
      .then((entity: IEntity) => {
      })
  }, [])

  const showDetail = () => {
    if (!adapter.detailComponent) {
      return
    }
    dialog.show({
      content: adapter.detailComponent
    })
  }

  const onSegmentedValueChange = useCallback((value: string) => {
    setSegmented(value)
    gridApi?.refreshInfiniteCache()
  }, [])

  const showConfirmArchive = () => {
    const archived = segmented === 'archived'
    const actionName = archived ? 'In-Archive' : 'Archive'
    dialog.confirm({
      title: `Confirm ?`,
      message: `Move ${selectedRows.length}item(s) to ${actionName}`,
      actionText: actionName,
      actionProps: {
        color: archived ? 'green' : 'orange'
      },
      async onActionClick() {
        await Promise.all(
          selectedRows.map(row => {
            return adapter.repository.patch({
              id: row!.id,
              attributes: {
                deletedAt: archived ? null : new Date().toISOString()
              }
            })
          })
        )
        .then(() => {
          gridApi?.deselectAll()
          gridApi?.refreshInfiniteCache()
        })
      }
    })
  }

  const showConfirmDelete = () => {
    dialog.confirm({
      title: 'Confirm delete?',
      message: `Delete ${selectedRows.length}item(s)`,
      actionText: 'Delete',
      actionProps: {
        color: 'red'
      },
      async onActionClick() {
        await Promise.all(
          selectedRows.map(row => {
            return adapter.repository.delete(Number(row!.id))
          })
        )
        .then(() => {
          gridApi?.deselectAll()
          gridApi?.refreshInfiniteCache()
        })
      },
    })
  }

  return (
    <Grid gapY="2">
      <Flex gap="2">
        <Button color="indigo" variant="soft" size="1" onClick={showDetail}>
          <PlusIcon /> { adapter.text.addNew }
        </Button>
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger disabled={!selectedRows.length}>
            <Button variant="soft" size="1">
              Actions
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="1">
            { adapter.softDelete && (
              <>
                <DropdownMenu.Item onClick={showConfirmArchive}> {segmented === 'archived' ? 'In-Archive': 'Archive' }</DropdownMenu.Item>
                <DropdownMenu.Separator />
              </>
            )}
            <DropdownMenu.Item color="red" onClick={showConfirmDelete}><TrashIcon/> Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        { adapter.softDelete && (
          <SegmentedControl.Root defaultValue="all" size="1" ml="auto" onValueChange={onSegmentedValueChange}>
            <SegmentedControl.Item value="all">All</SegmentedControl.Item>
            <SegmentedControl.Item value="archived">Trashed</SegmentedControl.Item>
          </SegmentedControl.Root>
        )}
      </Flex>
      <div style={{ height: 'calc(100dvh - 180px)' }}>
        <AgGridReact className="ag-theme-quartz"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoSizeStrategy={autoSizeStrategy}
          rowSelection={{mode: 'multiRow'}}
          onGridReady={onGridReady}
          onRowSelected={onRowSelected}
          onSelectionChanged={onSelectionChanged}
          onCellValueChanged={onCellValueChanged}
          pagination={true}
          paginationPageSize={20}
          getRowId={(params) => params.data.id}
          datasource={datasource}
          rowModelType="infinite"
          />
      </div>
    </Grid>
  );
}

export default Table;