<script setup lang="ts">
import { useAlertDialog } from './useAlertDialog'
const { items } = useAlertDialog()
</script>

<template>
    <AlertDialog :defaultOpen="true" v-for="item in items" :key="item.id" v-bind="item.props?.dialog">
      <component :is="item.component" v-if="item?.component" v-bind="item.props.content"/>
      <AlertDialogContent v-bind="item.props.content" v-else>
        <AlertDialogHeader>
          <AlertDialogTitle v-if="item.title">{{ item.title }}</AlertDialogTitle>
          <AlertDialogDescription v-if="item.description">{{ item.description }}</AlertDialogDescription>
        </AlertDialogHeader>
        <div class="text-wrap" v-if="item.content">{{ item.content }}</div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
</template>
