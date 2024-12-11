<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { IEntity } from '@entities'
import { ArrowDownWideNarrow, ArrowUpNarrowWide, EllipsisVertical, Undo2, EyeOff } from 'lucide-vue-next';

interface DataTableColumnHeaderProps {
  column: Column<IEntity, any>
}

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div :class="cn('flex items-center', $attrs.class ?? '')">
    <Button variant="ghost" size="fit" @click="column.toggleSorting()" class="me-auto flex items-center gap-1 rounded-xs" >
      {{ column.columnDef.header || '' }}
      <ArrowDownWideNarrow v-if="column.getIsSorted() === 'desc'" class="size-4" />
      <ArrowUpNarrowWide v-else-if=" column.getIsSorted() === 'asc'" class="size-4" />
    </Button>
    <DataTableFacetedPanel :column="column"/>
    <DropdownMenu v-if="column.getCanSort() || column.getCanHide()">
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="xs"
          :icon="true"
          class="data-[state=open]:bg-accent"
        >
          <EllipsisVertical class="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <template v-if="column.getCanSort()">

          <DropdownMenuItem @click="column.toggleSorting(false)">
            <ArrowUpNarrowWide class="size-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem @click="column.toggleSorting(true)">
            <ArrowDownWideNarrow class="size-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="column.clearSorting()">
            <Undo2 class="size-3.5 text-muted-foreground/70" />
            Reset
          </DropdownMenuItem>
        </template>
        <DropdownMenuItem @click="column.toggleVisibility(false)" v-if="column.getCanHide()">
          <EyeOff class="size-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
