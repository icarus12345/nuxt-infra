<script setup lang="ts">
import { PostSchema } from "@dashboard/data/post.schema";
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-4 p-4 flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-lg font-bold tracking-tight">
          {{ PostSchema.name }}
        </h2>
        <p class="text-muted-foreground">{{ PostSchema.description }}</p>
      </div>
    </div>
    <DataTable :schema="PostSchema" />
  </div>
</template>
