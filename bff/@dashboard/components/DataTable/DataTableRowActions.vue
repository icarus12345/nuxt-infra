<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { IEntity } from '@entities'
import { Pencil, Copy, Trash2, Ellipsis, ToggleLeft } from 'lucide-vue-next'
import { useCloned } from '@vueuse/core'
const $Toast = useToast()
const $Dialog = useDialog()

interface DataTableRowActionsProps {
  row: Row<IEntity>
}
const $DataTable = inject('DataTable')
const props = defineProps<DataTableRowActionsProps>()

const entity = computed(() => props.row.original)
const showEditDialog = (clone?: IEntity) => {
  const DetailDialog = defineAsyncComponent(() => import('../DetailDialog.vue'))
  $Dialog.show({
    component: shallowRef(DetailDialog),
    props: {
      content: {
        trapFocus: false,
        entity: clone ?? entity,
        schema: $DataTable.schema,
        source: $DataTable.source,
      }
    },
    callback() {
      $DataTable.refresh()
    }
  })
}
const showCopyDialog = () => {
  const { cloned } = useCloned<IEntity>(entity)
  cloned.value.id = undefined
  showEditDialog(cloned.value)
}
const handleDelete = () => {
  $Dialog.confirm({
    icon: Trash2,
    title: 'Delete entity ?',
    content: 'Do you want to delete "{entity}"',
  })
  // $DataTable.dataAdapter.source
  //   .patch({
  //     id: props.row.id,
  //     type: props.row.original.type,
  //     attributes: {
  //       deletedAt: props.row.original.attributes.deleteAt ? null : new Date().toISOString()
  //     }
  //   })
  //   .then(() => {
  //     $DataTable.refresh()
  //   })
}
const handleToggleActive = (d) => {
  console.log('props.row', props.row, $DataTable)
  $Dialog.confirm({
    title: 'Confirm change status?',
    // description: 'There was a problem with your request',
    content: `Change entity status to ${d === 'true' ? 'Active': 'In-Active'}`,
    okText: 'Delete',
    async callback() {
      await $DataTable.dataAdapter.source
        .save({
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
  })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        :icon="true"
        size="xs"
        v-permission="Object.values($DataTable.permissions)"
      >
        <Ellipsis class="size-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="showEditDialog()" v-permission="$DataTable.permissions.edit"><Pencil/>Edit</DropdownMenuItem>
      <DropdownMenuItem @click="showCopyDialog" v-permission="$DataTable.permissions.create"><Copy/>Make a copy</DropdownMenuItem>
      <DropdownMenuSeparator />
      <template v-if="row.original.attributes.active instanceof Boolean">
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
      </template>
      <DropdownMenuItem @click="handleDelete" v-permission="$DataTable.permissions.delete">
        <Trash2/> Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
