<script setup lang="ts">
import { TreeItem } from 'radix-vue/Tree'
import { menuItemVariants } from '../theme/menu'
// import { cn } from '@/lib/utils'

interface TreeNode {
  title: string
  children?: TreeNode[]
}

withDefaults(defineProps<{
  items: TreeNode[]
  level?: number
}>(), { level: 0 })
</script>

<template>
  <li
    v-for=" node in items"
    :key="node.id"
  >
    <TreeItem
      v-slot="{ isExpanded }"
      as-child
      :level="level"
      :value="node"
      :class="cn(
        menuItemVariants({}),
        ''
      )"
    >
      <div class="flex items-center justify-between gap-2">
        <FolderOpen class="h-4 w-4" v-if="isExpanded" />
        <Folder class="h-4 w-4" v-else />
        {{ node.id }}
      </div>

      <ul v-if="isExpanded && node.children">
        <Tree
          :items="node.children"
          :level="level + 1"
        />
      </ul>
    </TreeItem>
  </li>
</template>