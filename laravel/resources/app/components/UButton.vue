<script setup>
import { ref } from 'vue'
import { useDialog } from 'radix-vue'
const count = ref(0)
const { dialog } = useDialog()
const size = ['sm', 'md', 'lg']
const variant = ['', 'error', 'warning', 'success', 'info']
const click = () => {
  count.value++;
  dialog({
    variant: variant[count.value % 5],
    title: 'My Title',
    description: 'My description',
    content: 'My content',
    icon: 'lucide:info',
    size: size[count.value % 3],
    OKText: 'Delete',
    cancelText: 'Cancel',
    async callback() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 3000)
      });
    },
    OKProps: {
      variant: 'destructive',
      color: 'primary',
      size: 'sm'
    },
    cancelProps: {
      variant: 'outline',
    }
  })
  // .then(() => {
  //   alert(0)
  // })
}
</script>

<template>
  <Button @click="click">Dialog {{ count }} times.</Button>
</template>