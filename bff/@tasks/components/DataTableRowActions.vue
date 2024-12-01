<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { IEntity } from '@entities'
import { Pencil, Copy, Trash2, Ellipsis, ToggleLeft } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast'
import { useDialog } from '@/components/ui/dialog'
import { useAlertDialog } from '@/components/ui/alert-dialog'
const $Toast = useToast()
const $Dialog = useDialog()
const $AlertDialog = useAlertDialog()

interface DataTableRowActionsProps {
  row: Row<IEntity>
}
const $DataTable = inject('DataTable')
const props = defineProps<DataTableRowActionsProps>()

const entity = computed(() => props.row.original)
const handleEdit = () => {
  const DetailDialog = defineAsyncComponent(() => import('./DetailDialog.vue'))
  $AlertDialog.show({
    title: 'Uh oh! Something went wrong',
    description: 'There was a problem with your request',
    component: DetailDialog,
    props: {
      content: {
        entity
      }
    }
  })
}
const handleCopy = () => {
  $Toast.alert({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    action: {
      label: 'Undo',
      onClick: () => console.log('Undo'),
    },
  });
  $AlertDialog.show({
    title: 'Uh oh! Something went wrong',
    description: 'There was a problem with your request',
    props: {
      content: {
        size: 'sm'
      }
    }
  })
}
const handleDelete = () => {
  $DataTable.dataAdapter.source
    .patch({
      id: props.row.id,
      type: props.row.original.type,
      attributes: {
        deletedAt: props.row.original.attributes.deleteAt ? null : new Date().toISOString()
      }
    })
    .then(() => {
      $DataTable.refresh()
    })
}
const handleToggleActive = (d) => {
  console.log('handleToggleActive', d)
  $DataTable.dataAdapter.source
    .patch({
      id: props.row.id,
      type: props.row.original.type,
      attributes: {
        active: d === 'true'
      }
    })
    .then(() => {
      $DataTable.refresh()
    })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex size-6 p-0 data-[state=open]:bg-muted"
      >
        <Ellipsis class="size-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="handleEdit"><Pencil/>Edit</DropdownMenuItem>
      <DropdownMenuItem @click="handleCopy"><Copy/>Make a copy</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger class="gap-2"><ToggleLeft class="size-4"/>Status {{ row.original.attributes.active }}</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup :model-value="row.original.attributes.active.toString()" @update:modelValue="handleToggleActive">
            <DropdownMenuRadioItem :value="'true'">Active</DropdownMenuRadioItem>
            <DropdownMenuRadioItem :value="'false'">In-Active</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleDelete">
        <Trash2/> Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
