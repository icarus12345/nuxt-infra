<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { Check, Menu, Monitor, Moon, Sun, UserCircle } from 'lucide-vue-next';
// import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@ui/components/sheet'
// import { ScrollArea } from '@ui/components/scroll-area'
// import { Button } from '@ui/components/button'
// import {
//   DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, Shortcut,
//   DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal
// } from '@ui/components/dropdown-menu'
// import ThemePopover from '@/components/ThemePopover.vue'
// import ThemeDrawer from '@/components/ThemeDrawer.vue'
// import Search from '@/components/Search.vue'
import { navMenu, navMenuBottom } from '~/constants/menus'
import type { NavGroup, NavLink, NavSectionTitle } from '~/types/nav'
const { toggle } = useNavbar()

function handleLogout() {
  navigateTo('/login')
}

// function resolveNavItemComponent(item: NavLink | NavGroup | NavSectionTitle) {
//   if ('heading' in item)
//     return resolveComponent('LayoutNavHeadingMobile')
//   else if ('children' in item)
//     return resolveComponent('LayoutNavGroupMobile')

//   return resolveComponent('LayoutNavLinkMobile')
// }

const color = useColorMode()
const isMediumScreen = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <header class="fixed max-w-[132rem] mx-auto left-[calc((100dvw_-_min(132rem,_100dvw))_/_2)] top-0 z-20 h-10 flex items-center gap-4 bg-background w-full">
    <div class="w-full flex items-center gap-4 h-10 px-4 md:px-6">
      <Button :square="true" variant="ghost" class="md:hidden" @click="toggle">
        <Menu />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
      <!-- <Sheet>
        <SheetTrigger as-child>
          <Button :icon="true" variant="outline" class="md:hidden">
            <Icon name="material-symbols:menu" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent aria-describedby="radix-vue-dialog-description-1" side="left" class="flex flex-col p-4">
          <SheetHeader>
            <SheetTitle class="flex items-center gap-3">
              <Icon name="mdi:nuxt" class="w-5 h-5 fill-foreground" />
              Dashboard2
            </SheetTitle>
          </SheetHeader>
          <ScrollArea class="w-full">
            <nav class="grid gap-2">
              <component :is="resolveNavItemComponent(item)" v-for="(item, index) in navMenu" :key="index" :item="item" />
            </nav>
          </ScrollArea>
          <div class="mt-auto">
            <nav class="grid gap-2">
              <component :is="resolveNavItemComponent(item)" v-for="(item, index) in navMenuBottom" :key="index" :item="item" />
            </nav>
          </div>
        </SheetContent>
      </Sheet> -->

      <Search />

      <div class="ml-auto flex items-center gap-2">
        <ThemePopover v-if="isMediumScreen" />
        <ThemeDrawer v-else />
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="xs" shape="square">
              <UserCircle/>
              <span class="absolute top-0 right-0 w-2 h-2">
                <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-sky-400 opacity-75"></span>
                <span class="absolute inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuLabel class="flex font-normal">
              <div class="flex flex-col space-y-1">
                <p class="font-medium">
                  John Doe
                </p>
                <p class="text-sm text-muted-foreground">
                  demo@gmail.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <Shortcut>⇧⌘P</Shortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <Shortcut>⌘B</Shortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <Shortcut>⌘S</Shortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem @click="color.preference = 'light'">
                      <Sun />
                      <span class="ml-2">Light</span>
                      <Check v-if="color.preference === 'light'" class="ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="color.preference = 'dark'">
                      <Moon />
                      <span class="ml-2">Dark</span>
                      <Check v-if="color.preference === 'dark'" class="ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="color.preference = 'system'">
                      <Monitor />
                      <span class="ml-2">System</span>
                      <Check v-if="color.preference === 'system'" class="ml-auto" />
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="handleLogout">
              Log out
              <Shortcut>⇧⌘Q</Shortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>