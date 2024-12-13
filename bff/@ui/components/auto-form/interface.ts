import type { Component, InputHTMLAttributes } from 'vue'
import type { z, ZodAny } from 'zod'
import type { INPUT_COMPONENTS } from './constant'
import { Field } from '@interfaces/data-source'

export interface FieldProps {
  fieldName: string
  label?: string
  required?: boolean
  config?: ConfigItem
  disabled?: boolean
}

export interface Shape {
  type: string
  default?: any
  required?: boolean
  options?: string[]
  schema?: ZodAny
}

export interface InputComponents {
  Radio: Component
  Switch: Component
  Textarea: Component
  String: Component
  Media: Component
  Photos: Component
  Array: Component
  Object: Component

  RichText: Component
  Number: Component
  Checkbox: Component
  Textbox: Component
  Combobox: Component
  Select: Component
  DropdownList: Component
  CheckList: Component
  List: Component
  Date: Component
  TagsInput: Component
};

export interface ConfigItem {
  /** Value for the `FormLabel` */
  label?: string
  /** Value for the `FormDescription` */
  description?: string
  /** Pick which component to be rendered. */
  component?: keyof typeof INPUT_COMPONENTS | Component
  /** Hide `FormLabel`. */
  hideLabel?: boolean
  inputProps?: InputHTMLAttributes
  field?: Field
}

// Define a type to unwrap an array
type UnwrapArray<T> = T extends (infer U)[] ? U : never

export type Config<SchemaType extends object> = {
  // If SchemaType.key is an object, create a nested Config, otherwise ConfigItem
  [Key in keyof SchemaType]?:
  SchemaType[Key] extends any[]
    ? UnwrapArray<Config<SchemaType[Key]>>
    : SchemaType[Key] extends object
      ? Config<SchemaType[Key]>
      : ConfigItem;
}

export enum DependencyType {
  DISABLES,
  REQUIRES,
  HIDES,
  SETS_OPTIONS,
}

interface BaseDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> {
  sourceField: keyof SchemaType
  type: DependencyType
  targetField: keyof SchemaType
  when: (sourceFieldValue: any, targetFieldValue: any) => boolean
}

export type ValueDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
  BaseDependency<SchemaType> & {
    type:
      | DependencyType.DISABLES
      | DependencyType.REQUIRES
      | DependencyType.HIDES
  }

export type EnumValues = readonly [string, ...string[]]

export type OptionsDependency<
  SchemaType extends z.infer<z.ZodObject<any, any>>,
> = BaseDependency<SchemaType> & {
  type: DependencyType.SETS_OPTIONS

  // Partial array of values from sourceField that will trigger the dependency
  options: EnumValues
}

export type Dependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
  | ValueDependency<SchemaType>
  | OptionsDependency<SchemaType>
