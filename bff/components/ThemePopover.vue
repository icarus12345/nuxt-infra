<script setup lang="ts">
import { Paintbrush } from 'lucide-vue-next';
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="ghost" :icon="true">
        <Paintbrush />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-92" align="end">
      <ThemeCustomize />
    </PopoverContent>
  </Popover>
</template>

<style scoped>

</style>
