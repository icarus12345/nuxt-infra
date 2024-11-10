import { create } from 'zustand'
import { IDialogProps } from '../components/dialog';

export interface IDialoger {
  items: IDialogProps[]
  show: (item: IDialogProps) => void
  remove: (id: number) => void
  confirm: (item: IDialogProps) => void
}

let id: number = 1;
export const useDialog = create<IDialoger>((set) => ({
  items: [],
  show: (item: IDialogProps) => set((state: IDialoger) => ({
    items: [...state.items, {
      ...item,
      id: id++,
    }],
  })),
  remove: (id: number) => set((state: IDialoger) => ({
    items: state.items.filter(item=> item.id !== id),
  })),
  confirm: (item: IDialogProps) => set((state: IDialoger) => ({
    items: [...state.items, {
      actionText: 'Confirm',
      ...item,
      type: 'confirm',
      id: id++,
    }],
  })),
}))