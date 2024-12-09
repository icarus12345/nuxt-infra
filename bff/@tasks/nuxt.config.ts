import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  alias: { '@tasks': resolve('./') },
  components: [
    { 
      path: './components',
      ignore: [
      ],
    }
  ],
  // plugins: [
  //   './plugins/permission',
  // ]
})
