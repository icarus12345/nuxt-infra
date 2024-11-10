import { User } from '@/application/entities'
import { create } from 'zustand'

export interface ICrudState {
  selectedRows: User[]
  setSelectedRows: (items: User[]) => void
}

export const useCrudStore = create<ICrudState>((set) => ({
  selectedRows: [],
  setSelectedRows: (selectedRows: User[]) => set({selectedRows}),
}))