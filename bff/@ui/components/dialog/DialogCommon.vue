<script setup lang="ts">
const props = defineProps<{
  item: IDialogProp
}>()
const loading = ref(false);
const handleOKClick = () => {
  const callback = props.item.callback
  if (isAsyncFunction(callback)) {
    loading.value = true
    callback(promptValue.value)
      .then((status) => {
        if (status !== false) props.item.open = false
      })
      .finally(() => (loading.value = false))
  } else if (callback instanceof Function) {
    if (callback(promptValue.value) !== false) props.item.open = false
  }
}
provide('Dialog', props.item)
const promptValue = ref('')
</script>

<template>
  <component :is="item.component" v-if="item?.component" v-bind="item.props?.content"/>
  <DialogContent v-bind="item.props?.content" v-else>
    <DialogHeader>
      <DialogTitle v-if="item.title" class="flex items-center gap-2">
        <component :is="item.icon" v-if="item?.icon" class="size-5"/>
        {{ item.title }}
      </DialogTitle>
      <DialogDescription v-if="item.description">{{ item.description }}</DialogDescription>
    </DialogHeader>
    <div class="text-wrap" v-if="item.content">{{ item.content }}</div>
    <Input v-if="item.prompt" v-model="promptValue"/>
    <DialogFooter v-if="item.cancelText || item.okText">
      <DialogClose as-child v-if="item.cancelText">
        <Button v-bind="item.props?.cancelButton">{{ item.cancelText || 'Cancel' }}</Button>
      </DialogClose>
      <Button v-bind="item.props?.okButton" v-if="item.okText" @click="handleOKClick" :loading="loading">{{ item.okText || 'OK' }}</Button>
    </DialogFooter>
  </DialogContent>
</template>
