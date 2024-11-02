import React, { useCallback, useMemo } from "react";
import { Button, Container, Flex, IconButton, Popover, Select, TextField, Tooltip } from "@radix-ui/themes";
import { MixerHorizontalIcon, Cross2Icon, EnterFullScreenIcon } from "@radix-ui/react-icons";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, SelectionChangedEvent, RowSelectedEvent, RowSelectionOptions, SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import { useState } from "react";
import FullScreen from "./fullscreen.dialog";
import { useDialog } from "@ui/hooks/useDialog";

const PopoverDropdown = () => {
  const $dialog = useDialog();

  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([]);

  const onGridReady = useCallback((event: GridReadyEvent) => {
    // setGridApi(event);
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

  const showFullScreen = () => {
    $dialog.add({
      content: <FullScreen />
    })
  }

  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <Button aria-label="Update dimensions" variant="soft">
            <MixerHorizontalIcon /> Comment
          </Button>
        </Popover.Trigger>
        <Popover.Content style={{ padding: 0}} sideOffset={5}>
          <Container minHeight="320px" maxHeight="100dvh" width="380px" height="320px">
            <AgGridReact className="ag-theme-quartz ag-no-border"
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              autoSizeStrategy={autoSizeStrategy}
              rowSelection={rowSelection}
              onGridReady={onGridReady}
              onRowSelected={onRowSelected}
              onSelectionChanged={onSelectionChanged}
              />
          </Container>
          {/* <Flex p="12px">
            <Button size="1" variant="soft" color="indigo">Comment</Button>
          </Flex> */}
          <Popover.Close>
            <IconButton variant="soft" className="absolute bottom-3 right-3" onClick={showFullScreen}>
              <EnterFullScreenIcon />
            </IconButton>
          </Popover.Close>
        </Popover.Content>
      </Popover.Root>
      <Select.Root defaultValue="apple">
        <Select.Trigger variant="soft" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            <Select.Item value="orange">Orange</Select.Item>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="grape" disabled>
              Grape
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Vegetables</Select.Label>
            <Select.Item value="carrot">Carrot</Select.Item>
            <Select.Item value="potato">Potato</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  )
};

export default PopoverDropdown;
