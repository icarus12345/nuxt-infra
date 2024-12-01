<script setup lang="ts">
import { isVNode } from 'vue'
import { useDialog } from './useDialog'
const { items } = useDialog()
</script>

<template>
    <Dialog :defaultOpen="true" v-for="item in items" :key="item.id" v-bind="item.props?.dialog">
      <DialogContent v-bind="item.props?.content">
        <DialogHeader>
          <DialogTitle v-if="item.title">{{ item.title }}</DialogTitle>
          <DialogDescription v-if="item.description">{{ item.description }}</DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
              Name
            </Label>
            <Input id="name" default-value="Pedro Duarte" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right">
              Username
            </Label>
            <Input id="username" default-value="@peduarte" class="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
</template>
