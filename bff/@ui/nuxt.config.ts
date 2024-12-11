import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  alias: { '@ui': resolve('./') },
  components: [
    { 
      path: './components',
      ignore: [
        '**/*.ts'
      ],
      pathPrefix: false
    }
  ],
})
