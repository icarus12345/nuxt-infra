<script setup lang="ts">
import { MemberSchema } from '../data/member.schema'

</script>

<template>
  <div class="h-full flex-1 flex-col space-y-4 p-4 flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          {{ MemberSchema.name }}
        </h2>
        <p class="text-muted-foreground">{{ MemberSchema.description }}</p>
      </div>
      <div class="flex items-center space-x-2">
        <UserNav />
      </div>
    </div>
    <DataTable :schema="MemberSchema"/>
  </div>
</template>
