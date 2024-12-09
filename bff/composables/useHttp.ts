import { useStorage } from '@vueuse/core'
export const useHttp = () => {
  const config = useRuntimeConfig()
  const accessToken = useStorage('access_token', null)
  // const tokenStore = useAuthStore();
  const opts = {
    baseURL: config.public.apiBase,
    retryDelay: 500,
    retry: 1,
    async onRequest({ request, options }) {
      options.headers = {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${accessToken.value}`
      }
    },
    async onRequestError({ request, options, error }) {
      // Log error
      console.log("[fetch request error]", request, error);
    },
    async onResponse({ request, response, options }) {
      // Log response
      console.log("[fetch response]", request, response.status, response.body);
    },
  }
  return $fetch.create(opts)
}
export const $ApiClient = {
  get<T>(url: string, params?: any) {
    return useHttp()(url, {
      params
    })
  },
  post<T>(url: string, data?: any) {
    return useHttp()(url, {
      method: "POST",
      body: data,
    })
  }
}