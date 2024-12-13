<script setup lang="ts">
import { Field as FormField } from 'vee-validate'
import type { FieldProps } from './interface'
import { Image, ImagePlus, Trash2 } from 'lucide-vue-next'
import { useField, useFieldArray } from 'vee-validate'

const $Dialog = useDialog()
const props = defineProps<FieldProps>()
const field = useField<any>(() => props.fieldName)
const showGalleryDialog = () => {
  const GalleryDialog = defineAsyncComponent(() => import('@dashboard/components/Gallery/GalleryDialog.vue'))
  $Dialog.show({
    component: shallowRef(GalleryDialog),
    props: {
      content: {
        multiple: true
      }
    },
    callback(photos) {
      field.handleChange(photos)
    }
  })
}
const removePhoto = (photo) => {
  const newPhotos = field.value.value?.filter(v => v != photo)
  field.handleChange(newPhotos)
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
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="photo in slotProps.value"
              size="none"
              variant="ghost"
              @click="removePhoto(photo)"
              class="group relative overflow-hidden">
              <Avatar shape="none" class="">
                <AvatarImage :src="photo" v-if="photo"/>
                <AvatarFallback>
                  <Image class="!size-5 m-auto"/>
                </AvatarFallback>
                <div :class="[
                  'flex absolute group-focus:opacity-100 group-hover:opacity-100 inset-0 bg-muted/75 opacity-0',
                ]">
                  <Trash2 class="!size-4 m-auto"/>
                </div>
              </Avatar>
            </Button>
            <Button
              size="none"
              variant="ghost"
              @click="showGalleryDialog"
              class="group relative overflow-hidden"
              v-bind="{ ...slotProps.componentField, ...config?.inputProps }">
              <Avatar shape="none">
                <div :class="[
                  'flex absolute inset-0 bg-muted/75',
                ]">
                  <ImagePlus class="!size-5 m-auto"/>
                </div>
              </Avatar>
            </Button>
          </div>
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
