import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type { ApiError } from '@/types';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: (error.response?.data as { detail?: string })?.detail || error.message || 'Unknown error',
      status: error.response?.status || 0,
      code: error.code,
    };
    return Promise.reject(apiError);
  }
);

export default apiClient;
