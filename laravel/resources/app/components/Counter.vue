<script setup>
import { ref } from 'vue'
import { toast } from 'radix-vue'
const count = ref(0)
const click = () => {
  count.value++;
  console.log(toast)
  toast('Event has been created', {
    description: 'Sunday, December 03, 2023 at 9:00 AM',
    action: {
      label: 'Undo',
      onClick: () => console.log('Undo'),
    },
  })
}
</script>

<template>
  <Button @click="click">You clicked me {{ count }} times.</Button>
</template>