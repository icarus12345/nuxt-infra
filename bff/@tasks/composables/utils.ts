import type { Updater } from '@tanstack/vue-table'

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
export function isAsyncFunction(fn) {
  return fn instanceof AsyncFunction;
}

type NestedObject = Record<string, any>;

export function getValueByPath(obj: NestedObject, path: string): any {
  if (!obj || typeof obj !== 'object') return undefined;

  // Split the path into an array of keys
  const keys = path.split(/[.>]/);

  // Use reduce to traverse the object
  return keys.reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return acc[key];
    }
    return undefined; // Return undefined if the path is invalid
  }, obj);
}