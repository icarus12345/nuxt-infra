<script setup lang="ts">
const $NavBar = useNavbar()
</script>

<template>
  <Breadcrumb class="max-lg:hidden">
    <BreadcrumbList>
      <BreadcrumbItem class="hidden md:block">
        <BreadcrumbLink>
          {{ $NavBar.activeNavMenu.value[0]?.title }}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator class="hidden md:block" />
      <BreadcrumbItem>
        <BreadcrumbPage>{{ $NavBar.activeNavMenu.value[1].title }}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
