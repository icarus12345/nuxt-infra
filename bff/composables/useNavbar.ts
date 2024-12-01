import { navMenu, navMenuBottom } from '~/constants/menus'
import { createSharedComposable } from '@vueuse/core'
export const _useNavbar = () => {
  const route = useRoute()
  const hoveredNavItem = ref()
  const isOpen = ref(false)
  // const scrollLock = useBodyScrollLock(false)
  // useCookie<boolean>('isOpen', {
  //   default: () => true,
  // })

  function toggle() {
    // scrollLock.value = isOpen.value = !isOpen.value
  }

  const activeNavMenu = computed(() => {
    const nav = navMenu.filter((item: any) => {
      const link = item.link || '/'
      if (link === '/') {
        return route.path === link
      }
      return route.path.startsWith(link || 'unknown')
    }).pop()
    
    return nav
  })

  watch(
    () => route.path,
    (path: string) => {
      isOpen.value = false
      hoveredNavItem.value = undefined
      // if (scrollLock.value) {
      //   scrollLock.value = false
      // }
    },
  );

  return {
    isOpen,
    toggle,
    hoveredNavItem,
    activeNavMenu,
  }
}

export const useNavbar = createSharedComposable(_useNavbar)
