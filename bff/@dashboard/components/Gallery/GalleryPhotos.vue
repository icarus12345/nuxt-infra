<script setup lang="ts">
import { IMedia } from '@entities';
import { Check } from 'lucide-vue-next';
import { ListboxContent, ListboxItem, ListboxRoot } from 'radix-vue/Listbox'
import { useGalleryStore } from '@dashboard/stores/gallery.store'

const $GalleryStore = useGalleryStore()
type GalleryPhotosProps = {
  multiple?: boolean,
  photos: IMedia[]
}
const props = defineProps<GalleryPhotosProps>()
$GalleryStore.selectedFiles = props.multiple ? [] : undefined
</script>

<template>
  <ListboxRoot v-model="$GalleryStore.selectedFiles" :multiple="multiple">
    <ListboxContent class="grid gap-3 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
      <ListboxItem
        v-for="photo in photos"
        :key="photo.url"
        :value="photo.attributes.url"
        class="rounded bg-muted/50 focus:outline-hidden focus:ring focus:ring-ring group/photo ring-offset-background ring-offset-2 outline-hidden"
      >
        <AspectRatio :ratio="1" class="rounded">
          <img :src="photo.attributes.url" alt="Image" class="rounded object-contain w-full h-full">
          <div class="absolute bottom-0 left-0 right-0 p-2 bg-muted/50 text-xs rounded-b">
            <div class="flex flex-col">
              <span class="flex-1 truncate">{{ photo.attributes.name }}</span>
              <span class="text-muted-foreground">{{ byteFormat(photo.attributes.size) }}</span>
            </div>
          </div>
          <Check class="absolute bottom-1 right-1 group-data-[state=unchecked]/photo:hidden"/>
        </AspectRatio>
      </ListboxItem>
    </ListboxContent>
  </ListboxRoot>
</template>