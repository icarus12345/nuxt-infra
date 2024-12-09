<script lang="ts" setup>
import { type DialogContentProps } from 'radix-vue/Dialog'
import { useToast } from '@/components/ui/toast'
import { IDataSource } from '@interfaces'
import { RoleRepository } from '@repositories'
import { Pencil } from 'lucide-vue-next';
import { ISchema } from '../data/schema';

const $Toast = useToast()
const dialog = inject('Dialog')
type DataTableDialogProps = DialogContentProps & {
  schema: ISchema
}
const props = defineProps<DataTableDialogProps>()

const loading = ref(false);

const source: IDataSource = {
  root: 'data',
  // fields: [{
  //   type: 'number',
  //   name: 'value',
  //   map: 'id',
  // }, {
  //   type: 'string',
  //   name: 'label',
  //   map: 'attributes>name'
  // }],
  params: {
    include: 'permissions',
    withCount: 'permissions'
  },
  beforeSend(p) {
  },
  beforeLoadComplete(res) {
  },
  fetch: RoleRepository.fetch,
  save: RoleRepository.save,
  delete: RoleRepository.delete,
}
</script>
<template>
  <DialogContent class="grid-rows-[auto_minmax(0,1fr)]" size="2xl">
    <DialogHeader>
      <DialogTitle>{{ schema.name }}</DialogTitle>
      <DialogDescription>{{ schema.description }}</DialogDescription>
    </DialogHeader>
    <div class="min-h-[320px] [&_.data-table-scroller]:-mx-4">
      <DataTable :schema="schema" variant="none"/>
    </div>
    <!-- <DialogFooter>
      <DialogClose as-child>
        <Button variant="ghost">Close</Button>
      </DialogClose>
      <Button variant="soft" :loading="loading">Done</Button>
    </DialogFooter> -->
  </DialogContent>
</template>