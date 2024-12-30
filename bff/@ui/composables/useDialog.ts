import type { AsyncComponentLoader, Component, VNode } from 'vue'
import { computed, ref } from 'vue'
import { type DialogRootProps, type DialogContentProps } from 'reka-ui'
import { ButtonProps } from '../components/button/Button.vue'
import { CircleHelp } from 'lucide-vue-next'

type StringOrVNode =
  | string
  | VNode
  | (() => VNode)

export type IDialogProp = {
  id: string
  open: Ref<Boolean>
  title?: StringOrVNode
  prompt?: boolean,
  icon?: StringOrVNode | Component | AsyncComponentLoader
  description?: StringOrVNode
  content?: StringOrVNode | Component | AsyncComponentLoader
  component?: Component | AsyncComponentLoader
  props?: {
    dialog?: DialogRootProps,
    content?: DialogContentProps,
    okButton?: ButtonProps
    cancelButton?: ButtonProps
  },
  okText?: string,
  cancelText?: string,
  onOpenChange?: Function
  callback?: Function
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

export type TDialog = Omit<IDialogProp, 'id'>

function show(config: TDialog) {
  const id = genId()
  const item = {
    ...config,
    id,
    open: ref(true),
    props: {
      dialog: {
        ...config.props?.dialog
      },
      content: {
        ...config.props?.content
      },
      okButton: {
        ...config.props?.okButton
      },
      cancelButton: {
        ...config.props?.cancelButton
      },
    },
    onOpenChange(open: boolean) {
      if (!open) dismiss()
    },
  }
  const dismiss = () => {
    setTimeout(() => {
      const index = state.value.items.indexOf(item)
      state.value.items.splice(index, 1)
    }, 500)
  }
  state.value.items.push(item)

  return {
    id,
    dismiss,
  }
}

function alert(config: TDialog) {
  return show({
    ...config,
    props: {
      dialog: {
        ...config.props?.dialog
      },
      content: {
        size: 'xs',
        ...config.props?.content
      },
      // okButton?: ButtonProps
      // cancelButton?: ButtonProps
    },
  })
}
function confirm(config: TDialog) {
  return show({
    icon: CircleHelp,
    ...config,
    props: {
      dialog: {
        ...config.props?.dialog
      },
      content: {
        size: 'xs',
        ...config.props?.content
      },
      okButton: {
        variant: 'soft',
        ...config.props?.okButton
      },
      cancelButton: {
        variant: 'ghost',
        ...config.props?.cancelButton
      }
    },
    okText: 'OK',
    cancelText: 'Cancel',
  })
}
function prompt(config: TDialog) {
  return confirm({
    ...config,
    prompt: true
  })
}
function useDialog() {
  return {
    items: computed(() => state.value.items),
    show,
    alert,
    confirm,
    prompt,
    // dismiss: (id?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

export {
  useDialog,
}
