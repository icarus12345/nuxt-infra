<script lang="ts" setup>

defineProps<{
  permission: string
}>()
</script>
<template>
  <slot v-if="hasPermission(permission)" />
  <div v-else>
    <div>403 Forbidden</div>
    <p>you don't have permission to access this resource</p>
  </div>
</template>