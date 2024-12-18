import { type Theme, themes } from '@/utils/registry/themes'

interface Config {
  theme?: Theme['name']
  radius: number
}

export function useCustomize() {
  const appConfig = useAppConfig()
  const { value: color } = useColorMode()
  const isDark = color === 'dark'
  const config = useCookie<Config>('config', {
    default: () => (appConfig.theme),
  })

  // const themeClass = computed(() => `theme-${config.value.theme}`)

  // const theme = computed(() => config.value.theme)
  // const radius = computed(() => config.value.radius)

  // function setTheme(themeName: Theme['name']) {
  //   config.value.theme = themeName
  // }

  // function setRadius(newRadius: number) {
  //   config.value.radius = newRadius
  // }

  // const themePrimary = computed(() => {
  //   const t = themes.find(t => t.name === theme.value)
  //   return `hsl(${
  //     t?.cssVars[isDark ? 'dark' : 'light'].primary
  //   })`
  // })
  const radius = computed({
    get() {
      return appConfig.theme.radius
    },
    set(radius) {
      appConfig.theme.radius = radius
      config.value.radius = radius
    }
  })
  const primary = computed({
    get() {
      return appConfig.theme.primary
    },
    set(color) {
      appConfig.theme.primary = color
      config.value.primary = color
    }
  })
  const neutral = computed({
    get() {
      return appConfig.theme.neutral
    },
    set(color) {
      appConfig.theme.neutral = color
      config.value.neutral = color
    }
  })
  return {
    neutral,
    primary,
    radius,
    // themeClass,
    // theme,
    // setTheme,
    // radius,
    // setRadius,
    // themePrimary,
  }
}
