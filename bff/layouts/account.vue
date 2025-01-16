<script setup lang="ts">
import Default from './default.vue'; // Import layout cha
</script>
<template>
  <Default>
    <div class="flex flex-1 gap-3">  
      <AccountMenu />
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </Default>
</template>