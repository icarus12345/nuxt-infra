<script setup lang="ts">
import { themes } from '@/utils/registry/themes'
import { Check, Monitor, Sun, Moon } from 'lucide-vue-next'
const { primary, radius, neutral } = useCustomize()
import colors from 'tailwindcss/colors'
const colorMode = useColorMode()

const neutralColors = ['slate', 'gray', 'zinc', 'neutral', 'stone']

const colorsToOmit = ['inherit', 'current', 'transparent', 'black', 'white', ...neutralColors]
const primaryColors = Object.keys(omit(colors, colorsToOmit as any))

const RADII = [0, 0.4, 0.6, 1.0, 1.6]

// Whenever the theme value changes, update the document class list
watch([primary, neutral, radius], ([primary, neutral, radius]) => {
  // document.documentElement.classList.add(`theme-${primary.value}`)
  document.documentElement.style.setProperty('--color-primary', colors[primary][[500]])
  document.documentElement.style.setProperty('--color-primary-foreground', colors[primary][[100]])
  document.documentElement.style.setProperty('--color-ring', colors[primary][[400]])
  document.documentElement.style.setProperty('--color-secondary', colors[neutral][[500]])
  document.documentElement.style.setProperty('--color-secondary-foreground', colors[neutral][[100]])
  document.documentElement.style.setProperty('--radius', `${radius}rem`)
})

function backgroundColor(color: string) {
  return colors[color][[500]]
}

onMounted(() => {
  console.log(colors, 'colors')
})
</script>

<template>
  <div class="grid gap-3">
    <div class="grid space-y-1">
      <h1 class="text-md text-foreground font-semibold">
        Customize
      </h1>
      <p class="text-xs text-muted-foreground">
        Pick a style and color for your components.
      </p>
    </div>
    <div class="space-y-1">
      <Label>Primary</Label>
      <div class="grid grid-cols-3 gap-2">
        <template v-for="color in primaryColors" :key="color">
          <Button
            class="justify-start gap-2"
            variant="outline"
            size="sm"
            @click="primary = color"
            :data-active="primary === color || undefined"
          >
            <span class="size-3 flex items-center justify-center rounded-full" :style="{ backgroundColor: backgroundColor(color) }"></span>
            <span class="capitalize">{{ color }}</span>
          </Button>
        </template>
      </div>
    </div>

    <div class="space-y-1">
      <Label>Neutral</Label>
      <div class="grid grid-cols-3 gap-2">
        <template v-for="color in neutralColors" :key="color">
          <Button
            class="justify-start gap-2"
            variant="outline"
            size="sm"
            @click="neutral = color"
            :data-active="neutral === color || undefined"
          >
            <span class="size-3 flex items-center justify-center rounded-full" :style="{ backgroundColor: backgroundColor(color) }"></span>
            <span class="capitalize">{{ color }}</span>
          </Button>
        </template>
      </div>
    </div>
    
    <div class="space-y-1">
      <Label>Radius</Label>
      <div class="grid grid-cols-5 gap-2">
        <template v-for="r in RADII" :key="r">
          <Button
            class="justify-center gap-2"
            variant="outline"
            size="sm"
            :data-active="r === radius || undefined"
            @click="radius = r"
          >
            <span class="capitalize">{{ r }}</span>
          </Button>
        </template>
      </div>
    </div>
    <div class="space-y-1">
      <Label>Theme</Label>
      <div class="grid grid-cols-3 gap-2">
        <Button
          class="justify-center gap-2"
          variant="outline"
          size="sm"
          :data-active="colorMode.preference === 'light' || undefined"
          @click="colorMode.preference = 'light'"
        >
          <Sun />
          <span class="capitalize">Light</span>
        </Button>
        <Button
          class="justify-center gap-2"
          variant="outline"
          size="sm"
          :data-active="colorMode.preference === 'dark' || undefined"
          @click="colorMode.preference = 'dark'"
        >
          <Moon />
          <span class="capitalize">Dark</span>
        </Button>
        <Button
          class="justify-center gap-2"
          variant="outline"
          size="sm"
          :data-active="colorMode.preference === 'system' || undefined"
          @click="colorMode.preference = 'system'"
        >
          <Monitor />
          <span class="capitalize">System</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
