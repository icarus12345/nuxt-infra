<script lang="ts" setup>
import { type DialogContentProps } from 'reka-ui'
import { TreeItem, TreeRoot } from 'reka-ui/Tree'
import { menuItemVariants } from '@ui/components/theme/menu'
import { ChevronRight, Folder, FolderOpen, Plus, Upload } from 'lucide-vue-next';
import { useGalleryStore } from '@dashboard/stores/gallery.store'

const dialog = inject('Dialog')
const $Toast = useToast()
const $Dialog = useDialog()
const $GalleryStore = useGalleryStore()
type GalleryDialogProps = DialogContentProps & {
  multiple?: boolean
}
const props = defineProps<GalleryDialogProps>()
const loading = ref(false);

const onChange = (folder) => {
  $GalleryStore.loadFiles(folder?.id)
}

onMounted(() => {
  $GalleryStore.loadFolders()
  $GalleryStore.loadFiles()
})
const handleFileChange = async (event) => {
  await $GalleryStore.upload(event.target.files)
  event.target.value = null
};
const showPromptAddNewFolder = () => {
  console.log($GalleryStore.path)
  $Dialog.prompt({
    title: 'New Folder',
    description: `Input sub folder in ${$GalleryStore.path}`,
    async callback(name) {
      await $GalleryStore.mkdir(name)
    }
  })
}
const handleOK = () => {
  dialog.callback($GalleryStore.selectedFiles)
  dialog.open = false
}
</script>
<template>
  <DialogContent class="grid-rows-[auto_minmax(0,1fr)]" size="4xl">
    <DialogHeader>
      <DialogTitle>Gallery</DialogTitle>
      <DialogDescription>{{ $GalleryStore.path }}</DialogDescription>
    </DialogHeader>
    <div class="h-[calc(100dvh-26rem)] grid grid-cols-[20rem_1fr] gap-3 ">
      <TreeRoot
        v-slot="{ flattenItems }"
        class="list-none select-none rounded bg-muted/50 p-2 flex flex-col gap-0.5 overflow-y-auto"
        :items="$GalleryStore.folders"
        :get-key="(item) => item.id"
        v-model="$GalleryStore.activeFolder"
        @update:modelValue="onChange"
        v-if="$GalleryStore.folders"
      >
        <TreeItem
          v-for="item in flattenItems"
          v-slot="{ isExpanded }"
          :key="item._id"
          v-bind="item.bind"
          :class="cn(
            menuItemVariants({}),
            ''
          )"
        >
          <div :style="{ 'padding-left': `${item.level - 0.5}rem` }" class="flex items-center justify-between gap-2">
            <FolderOpen class="h-4 w-4" v-if="isExpanded" />
            <Folder class="h-4 w-4" v-else />
            {{ camelCase(item.value.attributes.name) }}
          </div>
        </TreeItem>
      </TreeRoot>
      <div class="rounded bg-muted/10 overflow-y-auto p-1">
        <GalleryPhotos :photos="$GalleryStore.files" :multiple="multiple" v-if="$GalleryStore.files"/>
      </div>
    </div>
    <DialogFooter>
      <Button variant="ghost" class="me-auto" @click="showPromptAddNewFolder"><Plus />New Folder</Button>
      <Button variant="ghost" as="label">
        <Upload/> Upload
        <input
        className='w-px h-px opacity-0 absolute'
        type="file" multiple accept="image/*" 
        @change="handleFileChange"
        />
      </Button>
      <Button variant="soft" @click="handleOK">OK</Button>
    </DialogFooter>
  </DialogContent>
</template>