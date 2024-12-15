<script setup lang="ts">
import { Ellipsis, FolderKanban } from 'lucide-vue-next'
import { ISchema } from '../types/schema.d';

const $Toast = useToast()
const $Dialog = useDialog()

interface DetailDialogToolbarProps {
  schemas: ISchema[]
}
const props = defineProps<DetailDialogToolbarProps>()

const showDataTableDialog = (schema) => {
  const DataTableDialog = defineAsyncComponent(() => import('./DataTable/DataTableDialog.vue'))
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
      <DropdownMenuItem v-for="(schema, index) in schemas" :key="index" @click="showDataTableDialog(schema)"><FolderKanban /> {{ schema.name }}</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
