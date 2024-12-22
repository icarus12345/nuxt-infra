<script setup lang="ts" generic="T extends ZodObjectOrWrapped">
import type { FormContext, GenericObject } from 'vee-validate'
import type { z, ZodAny } from 'zod'
import type { Config, ConfigItem, Dependency, FieldTab, Shape } from './interface'
import { toTypedSchema } from '@vee-validate/zod'
import { computed, toRefs } from 'vue'
import AutoFormField from './AutoFormField.vue'
import { provideDependencies } from './dependencies'
import { getBaseSchema, getBaseType, getDefaultValueInZodStack, getObjectFormSchema, type ZodObjectOrWrapped } from './utils'

const props = withDefaults(defineProps<{
  schema: T
  form?: FormContext<GenericObject>
  fieldConfig?: Config<z.infer<T>>
  tabs?: FieldTab[]
  dependencies?: Dependency<z.infer<T>>[]
  layout?: string,
}>(), {
})

const emits = defineEmits<{
  submit: [event: z.infer<T>]
}>()

const { dependencies } = toRefs(props)
provideDependencies(dependencies)

const shapes = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: { [key in keyof T]: Shape } = {}
  const baseSchema = getObjectFormSchema(props.schema)
  const shape = baseSchema.shape
  Object.keys(shape).forEach((name) => {
    const item = shape[name] as ZodAny
    const baseItem = getBaseSchema(item) as ZodAny
    let options = (baseItem && 'values' in baseItem._def) ? baseItem._def.values as string[] : undefined
    if (!Array.isArray(options) && typeof options === 'object')
      options = Object.values(options)

    val[name as keyof T] = {
      type: getBaseType(item),
      default: getDefaultValueInZodStack(item),
      options,
      required: !['ZodOptional', 'ZodNullable'].includes(item._def.typeName),
      schema: baseItem,
    }
  })
  return val
})

const shapeTabs = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const tabs: { [key in keyof T]: { [key in keyof T]: Shape } } = {}
  props.tabs?.forEach(({ name, fields }) => {
    tabs[name] = {}
    fields.forEach((key) => {
      const shape = shapes.value[key]
      tabs[name][key] = shape
    })
  })
  return tabs
})

const defaultShapes = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: { [key in keyof T]: Shape } = {}
  const keys: string[] = props.tabs?.map(tab => tab.fields).flat() || []

  for (const key in shapes.value) {
    const shape = shapes.value[key]
    if (!keys.includes(key)) {
      val[key] = shape
    }
  }
  return val
})


const fields = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: { [key in keyof z.infer<T>]: { shape: Shape, fieldName: string, config: ConfigItem } } = {}
  for (const key in shapes.value) {
    const shape = shapes.value[key]
    val[key as keyof z.infer<T>] = {
      shape,
      config: props.fieldConfig?.[key] as ConfigItem,
      fieldName: key,
    }
  }
  return val
})

const formComponent = computed(() => props.form ? 'form' : Form)
const formComponentProps = computed(() => {
  if (props.form) {
    return {
      onSubmit: props.form.handleSubmit(val => emits('submit', val)),
    }
  }
  else {
    const formSchema = toTypedSchema(props.schema)
    return {
      keepValues: true,
      validationSchema: formSchema,
      onSubmit: (val: GenericObject) => emits('submit', val),
    }
  }
})
const formRef = ref();
const submit = async () => {
  console.log(formRef.value,'formRef.value')
  if (formRef.value) {
    const isValid = await formRef.value.validate();
    console.log(isValid,'isValid')
    if (isValid) {
      formRef.value.submit();
    }
  }
};
provide('AutoForm', {
  layout: props.layout
})
defineExpose({
  submit
});
</script>

<template>
  <component
    :is="formComponent"
    v-bind="formComponentProps"
    ref="formRef"
  >
    <slot name="customAutoForm" :fields="fields">
      <template v-for="(shape, key) of defaultShapes" :key="key">
        <slot
          :shape="shape"
          :name="key.toString() as keyof z.infer<T>"
          :field-name="key.toString()"
          :config="fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem"
        >
          <AutoFormField
            :config="fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem"
            :field-name="key.toString()"
            :shape="shape"
          />
        </slot>
      </template>
      <Tabs class="col-span-12" :unmountOnHide="false" v-if="Object.keys(shapeTabs).length">
        <TabsList class="flex">
          <TabsTrigger v-for="(shapes, key) of shapeTabs" :key="key" :value="key" class="flex-1">
            {{ key }}
          </TabsTrigger>
        </TabsList>
        <TabsContent v-for="(shapes, name) of shapeTabs" :key="name" :value="name" forceMount class="mt-2">
          <template v-for="(shape, key) of shapes" :key="key">
            <slot
              :shape="shape"
              :name="key.toString() as keyof z.infer<T>"
              :field-name="key.toString()"
              :config="fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem"
            >
              <AutoFormField
                :config="fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem"
                :field-name="key.toString()"
                :shape="shape"
              />
            </slot>
          </template>
        </TabsContent>
      </Tabs>
    </slot>

    <slot :shapes="shapes" />
  </component>
</template>
