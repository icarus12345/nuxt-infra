<script setup lang=ts>
import { ChevronsUpDown, LogOut, Bell, CreditCard,BadgeCheck,Sparkles } from 'lucide-vue-next'
import { $AuthRepository } from "@repositories";
import { useAuthStore } from "@gateways";

const $AuthStore = useAuthStore()
const $Toast = useToast()
const $Dialog = useDialog()

const confirmLogout = () => {
  $Dialog.confirm({
    title: 'Confirm logout?',
    // description: 'There was a problem with your request',
    content: `Do you want to logout`,
    async callback() {
      return $AuthRepository
        .logout()
        .then(() => {
          $AuthStore.clear()
        })
    }
  })
}

</script>
<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu v-if="$AuthStore.profile">
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="$AuthStore.profile.attributes.avatar || ''" :alt="$AuthStore.profile.attributes.name" />
              <AvatarFallback class="rounded-lg">
                CN
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ $AuthStore.profile.attributes.name }}</span>
              <span class="truncate text-xs">{{ $AuthStore.profile.attributes.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="$AuthStore.profile.attributes.avatar || ''" :alt="$AuthStore.profile.attributes.name" />
                <AvatarFallback class="rounded-lg">
                  CN
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ $AuthStore.profile.attributes.name }}</span>
                <span class="truncate text-xs">{{ $AuthStore.profile.attributes.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="confirmLogout">
            <LogOut /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>