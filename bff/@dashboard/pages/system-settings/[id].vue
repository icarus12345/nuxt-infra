<script setup lang="ts">
import { IUser, IResource } from "@entities";
import { useAuthStore } from "@gateways";
import { Field as FormField, Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'
import { SettingSchema } from "@dashboard/data/setting.schema";
const route = useRoute()
definePageMeta({
  title: 'Setting',
  layout: 'setting',
});
const loading = ref(true);
const formRef = ref(null);
const $AuthStore = useAuthStore()
const formSchema = toTypedSchema(z.object({
}))
const formValues = {
};
const editingEntity = ref({
  id: route.params.id,
  attribute: {
    
  }
})
const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: formValues,
})
onMounted(async () => {
  await SettingSchema.source.get(route.params.id)
  .then((resource) => {
    editingEntity.value = resource.data;
  })
  .finally(() => {
    loading.value = false
  })
})
</script>

<template>
  <div class="p-3 max-w-160 grid gap-3">
    <h3 class="text-lg">Setting - {{ route.params.id }}</h3>
    <small>Your name may appear around application where you contribute or are mentioned. You can remove it at any time.</small>
    <DetailAutoForm ref="formRef" :entity="editingEntity" :schema="SettingSchema.schema" :source="SettingSchema.source" v-if="!loading"/>
    <div v-else class="py-12 text-center">Loading...</div>
    <div class="flex justify-between">
      <Button variant="soft" color="primary" @click="formRef?.doSubmit" :loading="formRef?.loading">Update</Button>
    </div>
  </div>
</template>