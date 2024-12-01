import type { Component, VNode } from 'vue'
import { computed, ref } from 'vue'
import { type DialogRootProps, type DialogContentProps } from 'radix-vue/Dialog'
import type { HTMLAttributes } from 'vue'

export type StringOrVNode =
  | string
  | VNode
  | (() => VNode)

type IDialogProp = {
  id: string
  title?: StringOrVNode
  description?: StringOrVNode
  action?: Component
  props?: {
    dialog?: DialogRootProps,
    content?: DialogContentProps,
  }
}
let count = 0

function genId() {
  count = (count + 1)
  return count.toString()
}

interface State {
  items: IDialogProp[]
}

const state = ref<State>({
  items: [],
})

function useDialog() {
  return {
    items: computed(() => state.value.items),
    show,
    // dismiss: (id?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

type TDialog = Omit<IDialogProp, 'id'>

function show(props: TDialog) {
  const id = genId()

  const dismiss = () => {
    console.log('dismiss')
  }

  state.value.items.push({
    ...props,
    id,
    // open: true,
    // onOpenChange: (open: boolean) => {
    //   if (!open)
    //     dismiss()
    // },
  })

  return {
    id,
    dismiss,
  }
}

export {
  useDialog,
}
