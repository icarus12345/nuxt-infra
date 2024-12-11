<script setup lang="ts">
import DialogCommon from './DialogCommon.vue';
const { items } = useDialog()
const loading = ref(false);
const handleOKClick = (item) => {
  const callback = item.callback
  if (isAsyncFunction(callback)) {
    loading.value = true
    callback()
      .then((status) => {
        if (status !== false) item.open = false
      })
      .finally(() => (loading.value = false))
  } else if (callback instanceof Function) {
    if (callback() !== false) item.open = false
  }
}
</script>

<template>
    <Dialog v-model:open="item.open" v-for="item in items" :key="item.id" v-bind="item.props?.dialog" @update:open="item.onOpenChange">
      <DialogCommon :item="item"/>
    </Dialog>
</template>
