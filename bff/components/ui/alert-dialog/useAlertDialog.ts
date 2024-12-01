import type { AsyncComponentLoader, Component, VNode } from 'vue'
import { computed, ref } from 'vue'
import { type AlertDialogProps, type AlertDialogContentProps } from 'radix-vue/AlertDialog'
import type { HTMLAttributes } from 'vue'

export type StringOrVNode =
  | string
  | VNode
  | (() => VNode)

type IAlertDialogProp = {
  id: string
  title?: StringOrVNode
  description?: StringOrVNode
  component?: Component | AsyncComponentLoader
  props?: {
    dialog?: AlertDialogProps,
    content?: AlertDialogContentProps,
  }
}
let count = 0

function genId() {
  count = (count + 1)
  return count.toString()
}

interface State {
  items: IAlertDialogProp[]
}

const state = ref<State>({
  items: [],
})

function useAlertDialog() {
  return {
    items: computed(() => state.value.items),
    show,
    // dismiss: (id?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

type TAlertDialog = Omit<IAlertDialogProp, 'id'>

function show(props: TAlertDialog) {
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
  useAlertDialog,
}
