import { navMenu } from '~/constants/menus'
import { createSharedComposable } from '@vueuse/core'
export const _useNavbar = () => {
  const route = useRoute()

  const activeNavMenu = computed(() => {
    const activeMenus = []
    let activeSubMenu;
    const activeMenu = navMenu.find(item => {
      activeSubMenu = item.children.find(v => route.path.startsWith(v.url))
      return !!activeSubMenu
    })
    if (activeMenu) {
      activeMenu.isActive = true
      activeMenus.push(activeMenu)
      activeMenus.push(activeSubMenu)
    }
    return activeMenus
  })

  watch(
    () => route.path,
    (path: string) => {
      console.log(path,'pathpathpath')
    },
  );

  return {
    items: navMenu,
    activeNavMenu,
  }
}

export const useNavbar = createSharedComposable(_useNavbar)
