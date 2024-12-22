
<script setup lang=ts>
import { useAuthStore } from "@gateways";
import ProjectNav from '../components/Layout/ProjectNav.vue';
import DashboardNav from '../components/Layout/DashboardNav.vue';
import AccountMenu from '../components/Layout/AccountMenu.vue';
import TeamMenu from '../components/Layout/TeamMenu.vue';
import ActiveBreadcrumb from '../components/Layout/ActiveBreadcrumb.vue';

const $AuthStore = useAuthStore()
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamMenu />
      </SidebarHeader>
      <SidebarContent>
        <DashboardNav />
        <ProjectNav />
      </SidebarContent>
      <SidebarFooter>
        <AccountMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header class="flex min-h-16 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:min-h-12">
        <div class="flex items-center gap-2 px-4 flex-1">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <ActiveBreadcrumb />
          <div class="w-full flex-1 md:w-auto md:flex-none ms-auto">
            <Search/>
          </div>
          <nav class="flex items-center">
            <ThemePopover />
          </nav>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="flex-1 rounded bg-muted/50  flex flex-col gap-3">
          <slot v-if="$AuthStore.accessToken" />
          <AuthLogin v-else />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
  
</template>