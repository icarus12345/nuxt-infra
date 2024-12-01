<script setup lang="ts">
import { Settings2, ListFilter } from 'lucide-vue-next';
const $DataTable = inject('DataTable')
const hasFiltered = computed(() => {
  return $DataTable.hasFiltered.value
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="relative"
      >
        <Settings2 class="h-4 w-4" />
        Settings
        <span class="absolute size-2 -top-1 -right-1 rounded-full bg-primary" v-if="hasFiltered"></span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="h-[calc(100dvh-26rem)] w-[32rem] rounded-s-none p-0 grid" align="end" :sideOffset="12">
      <Tabs default-value="filter" class="absolute inset-px flex flex-col">
        <TabsList class="rounded-b-none bg-transparent w-full grid grid-cols-2 p-0">
          <TabsTrigger value="filter" class="h-10 bg-muted/50 data-[state=active]:bg-muted/50 rounded-none data-[state=inactive]:border-b border-r">
            <span class="flex gap-1">
              <ListFilter class="h-4 w-4" /> Filter
            </span>
          </TabsTrigger>
          <TabsTrigger value="columns" class="h-10 bg-muted/50 data-[state=active]:bg-muted/50 rounded-none data-[state=inactive]:border-b">
            <span class="flex gap-1">
              <Settings2 class="h-4 w-4" /> Columns
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="filter" class="flex-1 data-[state=active]:flex h-[calc(100%_-_4rem)] bg-muted/50">
          <LazyDataTableFilterPanel />
        </TabsContent>
        <TabsContent value="columns" class="p-3 space-y-3 flex-1 bg-muted/50">
          <LazyDataTableColumnsPanel />
        </TabsContent>
      </Tabs>
      
    </PopoverContent>
  </Popover>
</template>
