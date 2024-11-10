import { FC, lazy, useCallback, useEffect, useMemo } from "react";
import { Badge, Button, Container, Flex, IconButton, Popover, SegmentedControl, Select, TextField } from "@radix-ui/themes";
import { EnterFullScreenIcon, ChevronDownIcon, PlusIcon } from "@radix-ui/react-icons";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, SizeColumnsToFitGridStrategy, IDatasource, GridApi, CellClickedEvent, CellKeyDownEvent, RowSelectionOptions, RowSelectedEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import { useState } from "react";
import { useDialog } from "@ui/store";
import { IConditions, IRepository, IResource, IResourceList } from "@interfaces";
import { IAttribute, IEntity } from "@entities";
import { IDataAdapter } from ".";
import { FieldProps } from "formik";
const FullScreen = lazy<FC<{ adapter: IDataAdapter }>>(() => import('@components/crud/fullscreen.dialog'));

export interface IPopoverDropdownProp extends FieldProps {
  adapter: IDataAdapter,
}

const PopoverDropdown: FC<IPopoverDropdownProp> = ( { adapter, field, form }: IPopoverDropdownProp) => {
  const dialog = useDialog();
  const [gridApi, setGridApi] = useState<GridApi>();
  const [reload, setReload] = useState<Date>();
  const [segmented, setSegmented] = useState<string>('all');
  const [selectedRows, setSelectedRows] = useState<Map<string, IEntity>>(new Map());
  const onGridReady = useCallback((event: GridReadyEvent) => {
    setGridApi(event.api);
  }, []);

  const datasource: IDatasource = useMemo<IDatasource>(() => {
    return {
      // called by the grid when more rows are required
      getRows(params) {
        if (segmented === 'selected') {
          const ids = Array.from(selectedRows.keys())
          params.filterModel['id'] = {
            filter: ids,
            type: 'in'
          }
        }
        adapter.repository.fetch(params)
          .then((resource: IResourceList<IEntity>) => {
            params.successCallback(resource.data, resource.meta?.page.total)
            setReload(new Date())
          })
          // .finally(() => gridApi?.hideOverlay())
      }
    }
  }, [segmented]);

  const selectRowsByIds = useCallback(() => {
    if (gridApi) {
      Array.from(selectedRows.values()).forEach((entity: IEntity) => {
        const node = gridApi.getRowNode(entity.id?.toString() || '')
        node?.setSelected(true)
      })
    }
  }, [gridApi, field.value]);

  useEffect(() => {
    selectRowsByIds();
  }, [reload]);

  useEffect(() => {
    setSelectedRows(() => {
      const map = new Map();
      field.value.map((entity: IEntity) => {
        map.set(String(entity.id), entity)
      })

      return map;
    });
    
  }, []);
 
  const columnDefs = useMemo<ColDef[]>(() => {
    return [{
      ...adapter.source.dataFields[0],
      resizable: false,
      filter: false,
    }, {
      ...adapter.source.dataFields[1],
      maxWidth: undefined,
      resizable: false,
      editable: false,
    }];
  }, []);
  const defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  const autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 80,
  }

  const showFullScreen = () => {
    dialog.show({
      content: FullScreen as unknown as FC,
      contentProps: {
        adapter
      }
    })
  }

  const onCellClicked = useCallback((event: CellClickedEvent) => {
    console.log('CellClickedEvent', event);
  }, []);

  const onCellKeyDown = useCallback((event: CellKeyDownEvent) => {
    console.log('CellKeyDownEvent', event);
    // if ((event.event as KeyboardEvent).key === "Enter") {
    //   const focusedCell = event.api.getFocusedCell(); // Lấy cell đang được focus
    //   if (focusedCell) {
    //     const rowNode = event.api.getDisplayedRowAtIndex(focusedCell.rowIndex); // Lấy row hiện tại
    //     if (rowNode) {
    //       rowNode.setSelected(true); // Chọn row
    //       console.log("Selected Row Data:", rowNode.data); // Hiển thị data của row đã chọn
    //     }
    //   }
    // }
  }, []);

  const onRowSelected = useCallback((event: RowSelectedEvent) => {
    if (!event.event) {
      return;
    }
    const selected = event.node.isSelected()
    const id = String(event.data.id)
    setSelectedRows((prevMap) => {
      const newMap = new Map(prevMap);
      
      if (selected) {
        if (!newMap.has(id)) {
          newMap.set(id, event.data)
        }
      } else {
        newMap.delete(id)
      }
      
      return newMap;
    });
    
    // form.setFieldValue(field.name, ids)
    // form.validateField(field.name)
  }, []);
  const displayValue = useMemo(() => {
    const entities = Array.from(selectedRows.values())
    return (
      <Flex gap="2" className="mr-auto truncate text-ellipsis">
        {entities.map((entity: IEntity) => {
          return <Badge key={String(entity.id)}>{entity.attributes.name}</Badge>
        })}
      </Flex>
    )
  }, [selectedRows]);

  const fieldBlur = useCallback(() => {
    form.setFieldTouched(field.name, true)
    form.validateField(field.name)
  }, [])

  const onOpenChange = useCallback((open: boolean) => {
    if (!open) {
      console.log(Array.from(selectedRows.values()),'Array.from(selectedRows.values())')
      form.setFieldValue(field.name, Array.from(selectedRows.values()))
      form.setFieldTouched(field.name, true)
      form.validateField(field.name)
    }
  }, [selectedRows])

  const onSegmentedValueChange = useCallback((value: string) => {
    setSegmented(value)
    gridApi?.refreshInfiniteCache()
  }, [])

  // const onFirstDataRendered = useCallback((event: FirstDataRenderedEvent) => {
  //   const selectedIds = field.value.map((d: IEntity) => d.id)
  //   event.api.forEachNode((node) => {
  //     if (selectedIds.includes(node.data.id)) {
  //       node.setSelected(true); // Đặt hàng thành đã chọn
  //     }
  //   });
  // }, [field.value]);


  return (
    <>
      <Popover.Root onOpenChange={onOpenChange}>
        <Popover.Trigger>
          <Button aria-label="Update dimensions" style={{overflow: 'hidden'}} variant="surface" color="gray" onBlur={fieldBlur}>
              { displayValue }
              <ChevronDownIcon className="min-w-4" />
          </Button>
        </Popover.Trigger>
        <Popover.Content style={{ padding: 0}} sideOffset={5}>
          <Flex gap="2" p="2">
            <SegmentedControl.Root defaultValue="all" size="1" mr="auto" onValueChange={onSegmentedValueChange}>
              <SegmentedControl.Item value="all">All</SegmentedControl.Item>
              <SegmentedControl.Item value="selected">Selected</SegmentedControl.Item>
            </SegmentedControl.Root>
            <Popover.Close>
              <IconButton variant="soft" onClick={showFullScreen}>
                <EnterFullScreenIcon />
              </IconButton>
            </Popover.Close>
          </Flex>
          <Container minHeight="320px" maxHeight="100dvh" width="320px" height="320px">
            <AgGridReact className="ag-theme-quartz ag-no-border"
              datasource={datasource}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              autoSizeStrategy={autoSizeStrategy}
              onRowSelected={onRowSelected}
              rowSelection={{
                mode: 'multiRow',
                // isRowSelectable: (node) => !node.data.attributes.locked
              }}
              onGridReady={onGridReady}
              onCellClicked={onCellClicked}
              onCellKeyDown={onCellKeyDown}
              rowModelType="infinite"
              pagination={true}
              paginationPageSize={20}
              suppressPaginationPanel={false}
              paginationPageSizeSelector={false}
              getRowId={(params) => params.data.id}
              />
          </Container>
          
        </Popover.Content>
      </Popover.Root>
    </>
  )
};

export default PopoverDropdown;
