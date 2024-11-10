import { FC, lazy, LazyExoticComponent, useState } from "react";
import {
  ArchiveIcon,
  CopyIcon,
  DotsVerticalIcon,
  HeartIcon,
  Pencil1Icon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { DropdownMenu, Flex, IconButton } from "@radix-ui/themes";
import { useDialog } from "@ui/store";
import { useCrudStore } from "./crud.hooks";
import { IEntity } from "@/application/entities";
import { CustomCellRendererProps } from "ag-grid-react";
import { IRepository } from "@/application/interfaces";
import { GridApi } from "ag-grid-community";


interface ICellActionProps extends CustomCellRendererProps<IEntity> {
  data: IEntity,
  api: GridApi,
  repository: IRepository
  detailComponent: LazyExoticComponent<FC>
}

const CellAction: FC<ICellActionProps> = ({ data, api, repository, detailComponent }: ICellActionProps) => {
  const dialog = useDialog();

  const showDetail = () => {
    dialog.show({
      content: detailComponent,
      contentProps: {
        data,
        callback() {
          api.refreshInfiniteCache()
        }
      }
    })
  }

  const showDuplicate = () => {
    dialog.show({
      content: detailComponent,
      contentProps: {
        data : {
          type: data?.type,
          attributes: data?.attributes,
          relationships: data?.relationships,
        },
        callback() {
          api.refreshInfiniteCache()
        }
      },
    })
  }
  const showConfirmDelete = () => {
    dialog.confirm({
      title: 'Confirm delete?',
      message: `Delete "${data?.attributes.name}"`,
      actionText: 'Delete',
      actionProps: {
        color: 'red'
      },
      async onActionClick() {
        return repository.delete(String(data!.id))
          .then(() => {
            api.refreshInfiniteCache()
          })
      }
    })
  }

  const showConfirmArchive = () => {
    const actionName = data?.attributes.deletedAt ? 'In-Archive' : 'Archive'
    dialog.confirm({
      title: 'Confirm?',
      message: `Move "${data?.attributes.name}" to ${actionName}`,
      actionText: actionName,
      actionProps: {
        color: data?.attributes.deletedAt ? 'green' : 'orange'
      },
      async onActionClick() {
        return repository
          .patch({
            id: data!.id,
            type: data?.type!,
            attributes: {
              deletedAt: data?.attributes.deletedAt ? null : new Date().toISOString()
            }
          })
          .then(() => {
            api.refreshInfiniteCache()
          })
      }
    })
  }

  return (
    <>
      { data && 
        <Flex className="absolute inset-0" align="center" justify="center">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost" size="1">
                <DotsVerticalIcon />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size="1">
              <DropdownMenu.Item onClick={showDetail}><Pencil1Icon/> Edit</DropdownMenu.Item>
              <DropdownMenu.Item onClick={showDuplicate}><CopyIcon/> Duplicate</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={showConfirmArchive}><ArchiveIcon />{data.attributes.deletedAt ? 'In-Archive' : 'Archive'}</DropdownMenu.Item>

              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item disabled>Move to project…</DropdownMenu.Item>
                  <DropdownMenu.Item disabled>Move to folder…</DropdownMenu.Item>

                  <DropdownMenu.Separator />
                  <DropdownMenu.Item disabled>Advanced options…</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>

              <DropdownMenu.Separator />
              <DropdownMenu.Item disabled><Share1Icon/>Share</DropdownMenu.Item>
              <DropdownMenu.Item disabled><HeartIcon/>Add to favorites</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="red" onClick={showConfirmDelete}><TrashIcon/> Delete</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      }
    </>
  )
};

export default CellAction;
  