<script setup lang="ts">
import { IEntity } from '@entities'
import { Check } from 'lucide-vue-next'

const $DataTable = inject('DataTable')
const table = $DataTable.table
const columns = computed(() => table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide(),
  ))
</script>
<template>
  <Command
    class="rounded border border-dashed h-auto"
    :filter-function="(column: columnDef<IEntity>, term) => columns.filter(c => c.id.includes(term)) "
  >
    <CommandInput placeholder="Columns" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup>
        <CommandItem
          v-for="column in columns"
          :key="column.id"
          class="capitalize"
          :value="column.id"
          :checked="column.getIsVisible()"
          @select="(value) => column.toggleVisibility(!column.getIsVisible())"
        >
          <div
            :class="cn(
              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
              column.getIsVisible()
                ? 'bg-primary text-primary-foreground'
                : 'opacity-50 [&_svg]:invisible',
            )"
          >
            <Check :class="'h-4 w-4'" />
          </div>
          <span>{{ column.id }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
