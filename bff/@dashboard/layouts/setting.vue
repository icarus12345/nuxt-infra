<script setup lang="ts">
import Default from '@/layouts/default.vue'; // Import layout cha
</script>
<template>
  <Default>
    <div class="flex flex-1 gap-3">  
      <SettingMenu />
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </Default>
</template>