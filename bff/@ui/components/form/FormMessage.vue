<script lang="ts" setup>
// import { cn } from '@/lib/utils'
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'
import { useFormField } from './useFormField'
import { CircleAlert, TriangleAlert } from 'lucide-vue-next';
const { layout } = inject('FormItem')
const { name, formMessageId } = useFormField()
</script>

<template>
  <ErrorMessage
    v-slot="{ message }"
    :id="formMessageId"
    as="p"
    :name="toValue(name)"
    :class="cn(
      'text-sm font-medium text-destructive col-start-2 flex items-center',
      layout === 'default' && 'col-start-2 row-start-1'
    )"
  >
    <TriangleAlert class="size-3.5 me-2"/> {{ message }}
  </ErrorMessage>
</template>
