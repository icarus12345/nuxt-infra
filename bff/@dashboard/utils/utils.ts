import type { Updater } from '@tanstack/vue-table'
import { Field } from '@interfaces/data-source';
import { IEntity } from '@entities';

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
export function isAsyncFunction(fn) {
  return fn instanceof AsyncFunction;
}

type NestedObject = Record<string, any>;

export function getValueByPath(obj: NestedObject, path: string, defaultValue = ''): any {
  if (!obj || typeof obj !== 'object') return undefined;

  if (!path) return obj

  // Split the path into an array of keys
  const keys = path.split(/[.>]/);

  // Recursive function to handle the traversal
  const traverse = (currentObj: NestedObject, keyArray: string[]): any => {
    const [currentKey, ...remainingKeys] = keyArray;
    let [key, fields] = currentKey.split(':');

    if (fields && Array.isArray(currentObj[key])) {
      return currentObj[key].map(item => traverse(item, [fields])) || []
    }
    const oKeys = currentKey.split(',');
    if (!currentKey) return defaultValue;

    if (Array.isArray(currentObj)) {
      // If current object is an array, map over elements
      return currentObj.map(item => traverse(item, [currentKey, ...remainingKeys])) || [];
    }

    if (currentObj && typeof currentObj === 'object' && (currentKey in currentObj || oKeys.length > 1)) {
      // Continue traversal if there are more keys
      if (remainingKeys.length > 0) {
        return traverse(currentObj[currentKey], remainingKeys);
      }
      if (oKeys.length > 1) {
        const value = {}
        oKeys.forEach(k => {
          value[k] = currentObj[k]
        })
        return value
      }
      return currentObj[currentKey] ?? defaultValue; // Return value if it's the last key
    }

    return defaultValue; // Return undefined if path is invalid
  };

  return traverse(obj, keys);
}
export function objectToEntity<T = IEntity>(input, fields: Field[]): T {
  const output = {};
  fields.forEach(field => {
    const { dataField, displayField, dataSource } = field;
    const pathSegments = displayField.split(/[.>]/);
    let target = output;

    // Traverse dynamically through the path
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      let [key, fields] = segment.split(':');
      if (i === pathSegments.length - 1) {
        // At the last segment, set the value
        if (Array.isArray(input[dataField]) && dataSource) {
          // Special handling for arrays (e.g., roles)
          target[key] = input[dataField].map(item => getValueByPath(item, dataSource?.valueMember || fields));
        } else {
          target[key] = input[dataField];
        }
      } else {
        // Create nested objects dynamically
        if (!target[key]) {
          target[key] = {};
        }
        target = target[key];
      }
    }
  })

  return output as T;
}

export function EntityToObject<T = IEntity>(entity: T, fields: Field[]): any {
  const output = {};
  fields.forEach(field => {
    output[field.dataField] = getValueByPath(entity as NestedObject, field.displayField || field.dataField)
  })

  return output as T;
}