<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next';
import { useRoute as useNativeRoute } from 'vue-router'
const route = useNativeRoute()
const navbar = useNavbar()
const { hoveredNavItem, activeNavMenu } = navbar
const props = defineProps<{
  item: any
}>()

const onClick = (e) => {
  hoveredNavItem.value = props.item
  if (props.item.children?.length) {
    e.stopPropagation()
    e.preventDefault()
    return false
  }
}
const isActive = computed(() => {
  return route.path.startsWith(props.item.link)
})
</script>

<template>
  <ListboxItem
    v-if="item"
    asChild
    :value="item.link"
    :class="
      cn(
        'group w-full gap-1 md:rounded-lg md:px-0 md:flex-col max-md:justify-start md:py-1',
        'text-foreground',
        'select-none',
        'data-[highlighted]:ring-green9- data-[highlighted]:ring-1-',
        'data-[state=checked]:bg-green9- data-[state=checked]:text-primary-',
        'data-[disabled]:opacity-50',
       
      )
    "
  >
    <Button asChild @mouseover="hoveredNavItem = item" variant="none">
      <RouterLink :to="item.link"
        active-class="text-primary"
        :class="[
           
           isActive ? 'bg-foreground/[0.05] hover:bg-foreground/[0.05': 'bg-transparent hover:bg-transparent',
        ]"
        >
        <span class="group-hover:bg-foreground/[0.05] rounded-full md:py-0.5 transition-all inline-flex md:px-3">
          <!-- <Icon v-if="item.icon" :name="item.icon" class="!w-4 !h-4 md:!w-5 md:!h-5" /> -->
        </span>
        <span class="md:text-xxs">{{ item.title }}</span>
        <ChevronRight class="ms-auto md:hidden" v-if="item.children?.length"/>
        <span class="absolute inset-0 md:hidden" @click="onClick"></span>
      </RouterLink>
    </Button>
  </ListboxItem>
</template>
