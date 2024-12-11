import { Ref } from "vue";

export function valueUpdater(updaterOrValue, ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}