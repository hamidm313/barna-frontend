import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('barna_token');
    const language = localStorage.getItem('barna_locale') || 'fa';
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers['Accept-Language'] = language;
    config.headers['X-Language'] = language;
    config.params = { ...(config.params || {}), language };
    if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
      config.data = { ...config.data, language };
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('barna_token');
      localStorage.removeItem('barna_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
