<script lang="ts" setup>
import { type DialogContentProps } from 'radix-vue/Dialog'
import { TreeItem, TreeRoot } from 'radix-vue/Tree'
import { menuItemVariants } from '@ui/components/theme/menu'
import { ChevronRight, Folder, FolderOpen, Plus, Upload } from 'lucide-vue-next';
import { MediaRepository } from '@repositories';
import { IResourceList } from '@interfaces';
import { IMedia } from '@entities';
import { watch } from 'vue';
import { cn } from '@/lib/utils'
import { useGalleryStore } from '@dashboard/stores/gallery.store'

const $Toast = useToast()
const $GalleryStore = useGalleryStore()
type GalleryDialogProps = DialogContentProps & {
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
</script>
<template>
  <DialogContent class="grid-rows-[auto_minmax(0,1fr)]" size="4xl">
    <DialogHeader>
      <DialogTitle>Gallery</DialogTitle>
      <DialogDescription>{{ $GalleryStore.activeFolder?.id ?? $GalleryStore.root }}</DialogDescription>
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
      <div class="rounded bg-muted/10 overflow-y-auto">
        <div class="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))]">
          <AspectRatio :ratio="1" v-for="(item, index) in $GalleryStore.files" class="rounded bg-muted/50">
            <img :src="item.attributes.url" alt="Image" class="rounded object-contain w-full h-full">
            <div class="absolute bottom-0 left-0 right-0 p-2 bg-muted/50 text-xs rounded-b">
              <div class="flex flex-col">
                <span class="flex-1 truncate">{{ item.attributes.name }}</span>
                <span class="text-muted-foreground">{{ byteFormat(item.attributes.size) }}</span>
              </div>
            </div>
            <Checkbox class="absolute top-1 left-1"/>
          </AspectRatio>
        </div>
      </div>
    </div>
    <DialogFooter>
      <Button variant="ghost" class="me-auto"><Plus />New Folder</Button>
      <Button variant="ghost" as="label">
        <Upload/> Upload
        <input
        className='w-px h-px opacity-0 absolute'
        type="file" multiple accept="image/*" 
        @change="handleFileChange"
        />
      </Button>
      <Button variant="soft">OK</Button>
    </DialogFooter>
  </DialogContent>
</template>