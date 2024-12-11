// import { useToast } from '@ui/components/toast/use-toast'
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from './storage'

export const useAxiosClient = () => {
    const config = useRuntimeConfig()
    const $Toast = useToast()
    const $AuthStore = useAuthStore()
    const client = axios.create({
      baseURL: config.public.apiBase,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      timeout: 10000, // Thời gian chờ mặc định là 10 giây
    });
    // Thêm interceptor cho request
    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if ($AuthStore.accessToken && config.headers) {
          config.headers['Authorization'] = `Bearer ${$AuthStore.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Thêm interceptor cho response
    client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<{message?: string, errors?: {detail: string}[]}>) => {
        const description = error.response?.data.errors?.map(d=>d.detail).join('\n') || error.response?.data.message || error.message
        $Toast.alert({
          variant: 'destructive',
          title: `${error.status || error.code} ${error.response?.statusText || ''}`,
          description
        });
        if (error.response?.status === 401) {
          $AuthStore.clear()
        }
        return Promise.reject(error);
      }
    );

  return client
}

export const $ApiClient = {
  async get<T>(url: string, params?: any): Promise<T> {
    const response = await useAxiosClient().get(url, { params });
    return response.data;
  },
  async post<T>(url: string, data?: any): Promise<T> {
    const response = await useAxiosClient().post(url, data);
    return response.data;
  },
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await useAxiosClient().put(url, data);
    return response.data;
  },
  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await useAxiosClient().patch(url, data);
    return response.data;
  },
  async delete(url: string): Promise<boolean> {
    const response = await useAxiosClient().delete(url);
    return !!response;
  }
}
// export const http = () => {
//   const config = useRuntimeConfig()
//   const accessToken = useStorage('access_token', null)
//   // const tokenStore = useAuthStore();
//   const opts = {
//     baseURL: config.public.apiBase,
//     retryDelay: 500,
//     retry: 1,
//     async onRequest({ request, options }) {
//       options.headers = {
//         'Accept': 'application/vnd.api+json',
//         'Content-Type': 'application/vnd.api+json',
//         'Authorization': `Bearer ${accessToken.value}`
//       }
//     },
//     async onRequestError({ request, options, error }) {
//       // Log error
//       console.log("[fetch request error]", request, error);
//     },
//     async onResponse({ request, response, options }) {
//       // Log response
//       console.log("[fetch response]", request, response.status, response.body);
//     },
//   }
//   return $fetch.create(opts)
// }
// export const $ApiClient = {
//   get<T>(url: string, params?: any) {

//     return http()(url, {
//       params: {
//         page: { number: 1, size: 1000 },
//       }
//     })
//   },
//   post<T>(url: string, data?: any) {
//     return http()(url, {
//       method: "POST",
//       body: data,
//     })
//   }
// }