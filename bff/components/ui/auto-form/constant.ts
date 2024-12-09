import type { InputComponents } from './interface'
import AutoFormFieldArray from './AutoFormFieldArray.vue'
import AutoFormFieldCheckList from './AutoFormFieldCheckList.vue'
import AutoFormFieldBoolean from './AutoFormFieldBoolean.vue'
import AutoFormFieldDate from './AutoFormFieldDate.vue'
import AutoFormFieldEnum from './AutoFormFieldEnum.vue'
import AutoFormFieldFile from './AutoFormFieldFile.vue'
import AutoFormFieldInput from './AutoFormFieldInput.vue'
import AutoFormFieldNumber from './AutoFormFieldNumber.vue'
import AutoFormFieldObject from './AutoFormFieldObject.vue'
import AutoFormFieldTagsInput from './AutoFormFieldTagsInput.vue'

export const INPUT_COMPONENTS: InputComponents = {
  Radio: AutoFormFieldEnum,
  Switch: AutoFormFieldBoolean,
  Textarea: AutoFormFieldInput,
  String: AutoFormFieldInput,
  File: AutoFormFieldFile,
  Array: AutoFormFieldArray,
  Object: AutoFormFieldObject,

  Number: AutoFormFieldNumber,
  Checkbox: AutoFormFieldBoolean,
  Textbox: AutoFormFieldInput,
  Combobox: AutoFormFieldEnum,
  DropdownList: AutoFormFieldEnum,
  Select: AutoFormFieldEnum,
  CheckList: AutoFormFieldCheckList,
  List: AutoFormFieldCheckList,
  Date: AutoFormFieldDate,
  TagsInput: AutoFormFieldTagsInput
}

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS
} = {
  ZodString: 'string',
  ZodBoolean: 'checkbox',
  ZodDate: 'date',
  ZodEnum: 'select',
  ZodNativeEnum: 'select',
  ZodNumber: 'number',
  ZodArray: 'array',
  ZodObject: 'object',
}
