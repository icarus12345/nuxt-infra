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
    // ['git@github.com:icarus12345/nuxt-ui.git#develop', { install: true }],
    // '../package/nuxt-ui',
    '.ui',
    '.dashboard',
    '@dashboard',
  ],
  experimental: {
    inlineSSRStyles: false
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '~/assets/css/tailwind.css',
    // '~/assets/css/themes.css',
  ],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  modules: [
    // '@nuxtjs/tailwindcss',
    // 'shadcn-nuxt',
    '@nuxtjs/color-mode',
    // '@vee-validate/nuxt',
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '',
    }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})