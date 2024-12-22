<script setup lang="ts">
import { NavigationMenuList, type NavigationMenuListProps } from 'radix-vue/NavigationMenu'
import { useForwardProps } from 'radix-vue/utilities'

const props = defineProps<NavigationMenuListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuList
    v-bind="forwardedProps"
    :class="
      cn(
        'group  list-none gap-y-1',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuList>
</template>
