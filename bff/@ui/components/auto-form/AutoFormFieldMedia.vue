<script setup lang="ts">
import { Field as FormField } from 'vee-validate'
import type { FieldProps } from './interface'
import { Image, ImagePlus } from 'lucide-vue-next'
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
        // multiple: true
      }
    },
    // okText: 'Save',
    callback(photo) {
      console.log(photo)
      field.handleChange(photo)
    }
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
            <Button size="none" variant="ghost" @click="showGalleryDialog" class="group relative overflow-hidden" v-bind="{ ...slotProps.componentField, ...config?.inputProps }">
              <Avatar shape="none" class="">
                <AvatarImage :src="slotProps.value" v-if="slotProps.value" />
                <div :class="[
                  'flex absolute group-focus:opacity-100 group-hover:opacity-100 inset-0 bg-muted/75',
                  {
                    'opacity-0': slotProps.value
                  }
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
