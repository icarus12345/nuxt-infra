<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { Dialoger } from '@/components/ui/dialog'
import { AlertDialoger } from '@/components/ui/alert-dialog'
const useIdFunction = () => useId()
</script>

<template>
  <NuxtLayout vaul-drawer-wrapper>
    <NuxtPage />
  </NuxtLayout>
  <Dialoger />
  <AlertDialoger/>
  <Toaster />
</template>
