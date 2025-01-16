<script setup lang="ts">
import { Check, Key, Settings, User } from 'lucide-vue-next';
import { ListboxContent, ListboxGroup, ListboxGroupLabel, ListboxItem, ListboxItemIndicator, ListboxRoot } from 'reka-ui/ListBox'
import { menuItemVariants } from '#ui/components/theme/menu'
</script>

<template>
  <ListboxRoot class="list-none select-none rounded-l bg-muted/50 p-2">
    <ListboxContent class="w-48">
      <ListboxGroup class="space-y-1">
        <ListboxItem :class="menuItemVariants({variant: 'link'})" as-child>
          <NuxtLink to="/system-settings/general" active-class="bg-accent text-primary">
            <Settings />
            <span>General</span>
          </NuxtLink>
        </ListboxItem>
        <ListboxItem :class="menuItemVariants({variant: 'link'})" as-child>
          <NuxtLink to="/system-settings/advance" active-class="bg-accent text-primary">
            <Settings />
            <span>Advance</span>
          </NuxtLink>
        </ListboxItem>
      </ListboxGroup>
    </ListboxContent>
  </ListboxRoot>
</template>