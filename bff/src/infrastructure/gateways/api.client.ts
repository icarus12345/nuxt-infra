import { ToastActions } from '@/ui/store/toast.slice';
import store from '@/ui/store/app.store';
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: String(process.env.NEXT_PUBLIC_API_BASE_URL),
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // Thời gian chờ mặc định là 10 giây
    });

    // Thêm interceptor cho request
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers['Content-Type'] = 'application/json';
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Thêm interceptor cho response
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        store.dispatch(ToastActions.alert({
          type: 'error',
          title: `${error.status || error.code} ${error.response?.statusText || ''}`,
          message: error.message
        }));
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
        }
        return Promise.reject(error);
      }
    );
  }

  // Phương thức GET
  public async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get(url, { params });
    return response.data;
  }

  // Phương thức POST
  public async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post(url, data);
    return response.data;
  }

  // Phương thức PUT
  public async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put(url, data);
    return response.data;
  }

  // Phương thức DELETE
  public async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete(url);
    return response.data;
  }
}
export const $ApiClient = new ApiClient();