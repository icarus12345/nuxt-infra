import Table from './table'
import PopoverDropdown from './popover'
import FullScreen from './fullscreen.dialog'
import DetailDialog from '../../pages/dashboard/components/user.detail'
import { ColDef } from 'ag-grid-community'
import { IRepository } from '@/application/interfaces'
import { FC } from 'react'

export {
  Table, PopoverDropdown, FullScreen, DetailDialog
}

export interface IDataAdapter<Repository = IRepository> {
  text: {
    title: string,
    addNew: string,
  },
  source: {
    include?: string,
    dataFields: ColDef[],
    
  },
  detailComponent?: FC,
  repository: Repository,
  rowSelection: 'single' | 'multiple',
  softDelete?: boolean
  serverSide?: boolean
}