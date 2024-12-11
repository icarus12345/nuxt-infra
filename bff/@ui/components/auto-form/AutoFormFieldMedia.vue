<script setup lang="ts">
import { Field as FormField } from 'vee-validate'
import type { FieldProps } from './interface'
import { Image, Trash2, TrashIcon } from 'lucide-vue-next'

const $Dialog = useDialog()
defineProps<FieldProps>()
const showGalleryDialog = () => {
  const DetailDialog = defineAsyncComponent(() => import('@dashboard/components/Gallery/GalleryDialog.vue'))
  $Dialog.show({
    component: shallowRef(DetailDialog),
    props: {
      content: {
      }
    },
    // okText: 'Save',
  })
}
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || camelCase(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <div>
          </div>
          <Button size="none" @click="showGalleryDialog" class="group">
            <Avatar shape="square" class="relative">
              <AvatarImage src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" />
              <Image class="size-8 absolute opacity-0 group-focus:opacity-100 group-hover:opacity-100"/>
            </Avatar>
          </Button>
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
