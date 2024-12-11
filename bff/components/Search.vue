<script setup lang="ts">
import { Circle } from 'lucide-vue-next'
import { navMenu } from '@/constants/menus'
import type { NavGroup } from '~/types/nav'
const { metaSymbol } = useShortcuts()

const openCommand = ref(false)
const router = useRouter()

defineShortcuts({
  Meta_K: () => openCommand.value = true,
})

const componentsNav = computed<NavGroup>(() => {
  return navMenu.find((nav: any) => nav.title === 'Components') as NavGroup
})

function handleSelectLink(link: string) {
  router.push(link)
  openCommand.value = false
}
</script>

<template>
  <Button variant="outline" @click="openCommand = !openCommand" class="sm:pr-12 relative">
    <span class="hidden sm:inline-flex">Search documentation</span>
    <span class="sm:hidden">Search...</span>
    <Kbd class="absolute top-1/2 -translate-y-1/2 right-1">
      <span class="text-xs">{{ metaSymbol }}</span>K
    </Kbd>
  </Button>

  <CommandDialog v-model:open="openCommand">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="Home" @select="handleSelectLink('/')">
          Home
            <Kbd>G</Kbd>
            <Kbd>H</Kbd>
        </CommandItem>
        <CommandItem value="email" @select="handleSelectLink('/email')">
          Email
            <Kbd>G</Kbd>
            <Kbd>E</Kbd>
        </CommandItem>
      </CommandGroup>
      <!--<CommandSeparator />-->
      <CommandGroup heading="Components">
        <CommandItem
          v-for="nav in componentsNav?.children"
          :key="nav.title"
          :value="nav.title"
          @select="handleSelectLink(nav.link)"
          class="flex items-center"
        >
          <Circle class="w-4 h-4 mr-2" />
          {{ nav.title }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>

<style scoped>

</style>
