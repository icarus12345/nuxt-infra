import { useStorage } from '@vueuse/core'

export const useTokenStore = defineStore('token', () => {
  const accessToken = useStorage('access_token', null)
  const setToken = (token) => {
    accessToken.value = token
  }
  return {
    accessToken,
    setToken,
  }
})