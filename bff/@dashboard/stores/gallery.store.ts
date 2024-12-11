import { IMedia } from '@entities';
import { MediaRepository } from '@repositories';
import { IResourceList } from '@interfaces';
import { computed } from 'vue';


export const useGalleryStore = defineStore('gallery', () => {
  const maxSize = 200 * 1024;
  const $Toast = useToast()
  const root = 'photos'
  const folders = ref()
  const activeFolder = ref()
  const files = ref()
  const mapper = new Map<string, IMedia[]>()

  type TreeNode = IMedia & {
    children: TreeNode[];
  };

  function buildTreeRecursive(items: IMedia[], parentId: string = root): TreeNode[] {
    return items
      .filter((item) => {
        const parentPath = item.id.substring(0, item.id.lastIndexOf('/'));
        return parentPath === parentId;
      })
      .map((item) => {
        const children = buildTreeRecursive(items, item.id)
        return {
          ...item,
          children: children.length ? buildTreeRecursive(items, item.id) : undefined, // Gọi đệ quy
        }
      });
  }

  const loadFiles = async () => {
    if (mapper.has(path.value)) {
      files.value = mapper.get(path.value)
      return
    }
    const resource: IResourceList<IMedia> = await MediaRepository.fetch(path.value, 'file')
    mapper.set(path.value, resource.data)
    files.value = resource.data
  }

  const loadFolders = async () => {
    if (folders.value) return;
    const resource: IResourceList<IMedia> = await MediaRepository.fetch(root, 'folder')
    folders.value = buildTreeRecursive(resource.data)
  }

  const upload = async (fileList: FileList) => {
    Array.from(fileList || [])
      .filter((file) => {
        if (file.size > maxSize) {
          $Toast.alert({
              title: 'Warning',
              type: 'warning',
              description: `File ${file.name} is too large and will be skipped.`
            })
            return false;
        }
        return true;
      })
      .map((file) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const paths = [path.value, file.name].filter(Boolean).join('/')
          const media = await MediaRepository.save(paths, reader.result as string)
          console.log(media)
          files.value.push(media)
        };

        reader.readAsDataURL(file);
      })
  }
  const path = computed(() => {
    return activeFolder.value?.id || root
  })

  return {
    loadFolders,
    loadFiles,
    folders,
    activeFolder,
    files,
    upload,
  }
})