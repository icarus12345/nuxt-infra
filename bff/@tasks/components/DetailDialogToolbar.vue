<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { Pencil, Copy, Trash2, Ellipsis, ToggleLeft, FolderKanban } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast'
import { useDialog } from '@/components/ui/dialog'
import { ISchema } from '../data/schema';

const $Toast = useToast()
const $Dialog = useDialog()

interface DetailDialogToolbarProps {
  schemas: ISchema[]
}
const props = defineProps<DetailDialogToolbarProps>()

const showDataTableDialog = (schema) => {
  const DataTableDialog = defineAsyncComponent(() => import('./DataTableDialog.vue'))
  $Dialog.show({
    component: shallowRef(DataTableDialog),
    props: {
      content: {
        schema
      }
    },
    callback() {

    }
  })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class=""
      >
        <Ellipsis class="size-4" />
        <span>More</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem v-for="(schema, index) in schemas" :key="index" @click="showDataTableDialog(schema)"><FolderKanban/> {{ schema.name }}</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
