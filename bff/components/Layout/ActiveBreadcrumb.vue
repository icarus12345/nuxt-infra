<script setup lang="ts">
const $NavBar = useNavbar()
const route = useRoute()
</script>

<template>
  <Breadcrumb class="max-lg:hidden">
    <BreadcrumbList v-if="$NavBar.activeNavMenu.value.length">
      <BreadcrumbItem class="hidden md:block">
        <BreadcrumbLink>
          {{ $NavBar.activeNavMenu.value[0]?.title }}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator class="hidden md:block" />
      <BreadcrumbItem v-if="$NavBar.activeNavMenu.value[1]">
        <BreadcrumbPage>{{ $NavBar.activeNavMenu.value[1].title }}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
    <BreadcrumbList v-else>
      <BreadcrumbItem>
        <BreadcrumbPage>{{ route.meta.title }}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
