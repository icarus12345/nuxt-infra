import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  alias: { '@dashboard': resolve('./') },
  components: [
    { 
      path: './components',
      ignore: [
      ],
      pathPrefix: false
    }
  ],
  // plugins: [
  //   './plugins/permission',
  // ]
  modules: ['@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
