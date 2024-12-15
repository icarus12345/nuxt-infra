<script lang="ts" setup>
import { type DialogContentProps } from 'radix-vue/Dialog'
import { ISchema } from '../../types/schema.d';

const $Toast = useToast()
const dialog = inject('Dialog')
type DataTableDialogProps = DialogContentProps & {
  schema: ISchema
}
const props = defineProps<DataTableDialogProps>()

const loading = ref(false);
</script>
<template>
  <DialogContent class="grid-rows-[auto_minmax(0,1fr)]" size="2xl">
    <DialogHeader>
      <DialogTitle>{{ schema.name }}</DialogTitle>
      <DialogDescription>{{ schema.description }}</DialogDescription>
    </DialogHeader>
    <div class="min-h-[calc(100dvh-26rem)] [&_.data-table-scroller]:-mx-4">
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