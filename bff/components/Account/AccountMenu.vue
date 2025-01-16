<script setup lang="ts">
import { Check, Key, Settings, User } from 'lucide-vue-next';
import { ListboxContent, ListboxGroup, ListboxGroupLabel, ListboxItem, ListboxItemIndicator, ListboxRoot } from 'reka-ui/ListBox'
import { menuItemVariants } from '#ui/components/theme/menu'
import { useAuthStore } from "@gateways";
const $AuthStore = useAuthStore()
</script>

<template>
  <ListboxRoot class="list-none select-none bg-muted/20 p-2">
    <ListboxContent class="w-48">
      <ListboxGroup class="space-y-1">
        <ListboxGroupLabel class="flex gap-2 p-1 bg-muted/75 rounded">
          <Avatar class="h-8 w-8 rounded">
            <AvatarImage :src="$AuthStore.profile.attributes.avatar || ''" :alt="$AuthStore.profile.attributes.name" />
            <AvatarFallback>
              CN
            </AvatarFallback>
          </Avatar>
          <div class="grid flex-1 text-left text-sm">
            <span class="truncate">{{ $AuthStore.profile.attributes.name }}</span>
            <span class="truncate text-xs">{{ $AuthStore.profile.attributes.email }}</span>
          </div>
        </ListboxGroupLabel>
        <ListboxItem :class="menuItemVariants({variant: 'link'})" as-child>
          <NuxtLink to="/account/profile" active-class="bg-accent text-primary">
            <User />
            <span>Profile</span>
          </NuxtLink>
        </ListboxItem>
        <ListboxItem :class="menuItemVariants({variant: 'link'})" as-child>
          <NuxtLink to="/account/setting" active-class="bg-accent text-primary">
            <Settings />
            <span>Setting</span>
          </NuxtLink>
        </ListboxItem>
        <ListboxItem :class="menuItemVariants({variant: 'link'})" as-child>
          <NuxtLink to="/account/change-password" active-class="bg-accent text-primary">
            <Key />
            <span>Change Password</span>
          </NuxtLink>
        </ListboxItem>
      </ListboxGroup>
    </ListboxContent>
  </ListboxRoot>
</template>