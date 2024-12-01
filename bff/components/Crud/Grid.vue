<script setup lang="ts">
  // import { AgGridVue } from "ag-grid-vue3";
  const rowData = ref([]);

  const colDefs = ref([
    { field: "mission", filter: true },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "price" },
    { field: "successful" },
    { field: "rocket" },
  ]);

  const defaultColDef = ref({
    filter: true,
  });

  // Fetch data when the component is mounted
  onMounted(async () => {
    rowData.value = await fetchData();
  });

  const fetchData = async () => {
    const response = await fetch(
      "https://www.ag-grid.com/example-assets/space-mission-data.json",
    );
    return response.json();
  };
</script>
<template>
  <!-- The AG Grid component -->
  <ag-grid-vue
    style="width: 100%; height: 100%"
    class="ag-theme-quartz ag-theme-default"
    :columnDefs="colDefs"
    :rowData="rowData"
    :defaultColDef="defaultColDef"
    >
  </ag-grid-vue>
</template>