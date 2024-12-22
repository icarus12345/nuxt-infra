<script lang="ts" setup>
import { MoreHorizontal, Frame, Forward, Trash2 } from 'lucide-vue-next'

const projects = [
  {
    name: 'Design Engineering',
    url: '#',
    icon: 'home',
  },
  {
    name: 'Sales & Marketing',
    url: '#',
    icon: 'home',
  },
  {
    name: 'Travel',
    url: '#',
    icon: 'home',
  },
]
</script>
<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Projects</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem
        v-for="item in projects"
        :key="item.name"
      >
        <SidebarMenuButton as-child>
          <a :href="item.url">
            <Frame />
            <span>{{ item.name }}</span>
          </a>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover>
              <MoreHorizontal />
              <span class="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-48 rounded-lg" side="bottom" align="end">
            <DropdownMenuItem>
              <Frame class="text-muted-foreground" />
              <span>View Project</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Forward class="text-muted-foreground" />
              <span>Share Project</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2 class="text-muted-foreground" />
              <span>Delete Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton class="text-sidebar-foreground/70">
          <MoreHorizontal class="text-sidebar-foreground/70" />
          <span>More</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>