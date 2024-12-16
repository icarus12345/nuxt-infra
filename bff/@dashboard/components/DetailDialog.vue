<script lang="ts" setup>
import { type DialogContentProps } from 'radix-vue/Dialog'
import { IEntity } from '@entities'
import { h } from 'vue'
import * as z from 'zod'
import { FieldSchema, DataAdapter, IDataSource } from '@interfaces'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import DetailDIalogToolbar from './DetailDIalogToolbar.vue'
const $Toast = useToast()
const dialog = inject('Dialog')
type DetailDialogProps = DialogContentProps & {
  entity?: IEntity,
  schema: FieldSchema
  source: IDataSource,
}
const props = defineProps<DetailDialogProps>()
const obj = {}
const fieldConfig = {}
const schemas = props.schema.fields.filter(field => field.schema).map(field => field.schema)
props.schema.fields.forEach(field => {
  const dataField = field.dataField
  obj[dataField] = field.shape
  let value = getValueByPath(props.entity, field.displayField || dataField)
  if (!value) {
    if (field.shape instanceof z.ZodArray) {
      value = []
    }
  }
  if (value) {
    obj[dataField] = field.shape.default(value)
  }
  fieldConfig[dataField] = {
    component: field.fieldType,
    field: field,
    description: field.hint
  }
})
const loading = ref(false);
const formSchema = z.object(obj)
function onSubmit(values: Record<string, any>) {
  const entity = objectToEntity(values, props.schema.fields)
  loading.value = true;
  props.source
  .save({
    id: props.entity?.id,
    ...entity
  })
  .then(() => {
    $Toast.alert({
      variant: 'success',
      description: `${props.entity?.id ? 'Update' : 'Create a'} Entity Success!`,
    })
    dialog.open = false
    dialog.callback()
  })
  .finally(() => (loading.value = false))
  
}
const form = useForm({
  // initialValues: EntityToObject({}, props.schema.fields),
  validationSchema: toTypedSchema(formSchema),
})
const doSubmit = async ($event) => {
  const isValid = await form.validate(); // Kiểm tra xem form hợp lệ
  if (isValid) {
    form.handleSubmit(onSubmit)(); // Gọi hàm submit
  } else {
    console.error('Form validation failed');
  }
}
const handleInteractOutside = (event) => {
  // Ngăn đóng khi click outside
  event.preventDefault();
};
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    // Ngăn đóng khi nhấn phím ESC
    event.preventDefault();
  }
};
</script>
<template>
  <DialogContent
    :size="schema.size ?? 'xs'"
    class="grid-rows-[auto_minmax(0,1fr)_auto]"
    @keydown="handleKeydown"
    @interact-outside="handleInteractOutside">
    <DialogHeader>
      <DialogTitle>{{ entity?.id ? 'Edit ' : 'Create new a' }} {{ schema.name }}</DialogTitle>
      <DialogDescription>{{ schema.description }}</DialogDescription>
    </DialogHeader>
    <div class="overflow-y-auto -mx-4">
      <AutoForm
        class="grid grid-cols-12 gap-3 px-4 py-1"
        :form="form"
        :schema="formSchema"
        :field-config="fieldConfig"
        @submit="onSubmit"
      >
      </AutoForm>
    </div>
    <DialogFooter>
      <DetailDIalogToolbar v-if="schemas.length" :schemas="schemas"/>
      <DialogClose as-child class="ms-auto">
        <Button variant="ghost">Close</Button>
      </DialogClose>
      <Button variant="soft" @click="doSubmit" :loading="loading">{{ entity ? 'Save' : 'Create' }}</Button>
    </DialogFooter>
  </DialogContent>
</template>