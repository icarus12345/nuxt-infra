import { create } from 'zustand'
import { IToastProps } from '@components/toast'

export interface IToaster {
  items: IToastProps[]
  alert: (item: IToastProps) => void
}

let id: number = 1;
export const useToast = create<IToaster>((set) => ({
  items: [],
  alert: (item: IToastProps) => set((state: IToaster) => {
    item.id = id++
    return {
      items: [...state.items, item],
    }
  }),
}))