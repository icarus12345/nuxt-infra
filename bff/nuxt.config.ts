// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
export default defineNuxtConfig({
  alias: {
    "@application/*": resolve("./@application/*"),
    "@entities": resolve("./@application/entities"),
    "@interfaces": resolve("./@application/interfaces"),
    "@mappers": resolve("./@application/mappers"),
    "@usecases": resolve("./@application/usecases"),
    "@gateways": resolve("./@infrastructure/gateways"),
    "@repositories": resolve("./@infrastructure/repositories"),
  },
  extends: [
    '@tasks',
  ],
  experimental: {
    inlineSSRStyles: false
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/themes.css',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '',
    }
  },
})