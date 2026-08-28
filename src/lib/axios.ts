import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { APP_CONFIG } from '@/utils/constants';
import { storage } from '@/lib/storage';

export class ApiError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(message: string, statusCode: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const apiClient = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.get<string>('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    if (error.response) {
      const { status, data } = error.response;

      let userMessage = data?.message;

      // Handle explicit HTTP Status Codes (400, 401, 403, 404, 409, 422, 429, 500)
      switch (status) {
        case 400:
          userMessage = userMessage || 'Bad Request. Please check your form input parameters.';
          break;
        case 401:
          userMessage = 'Session expired. Please sign in again.';
          storage.remove('access_token');
          storage.remove('user');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
          }
          break;
        case 403:
          userMessage = userMessage || 'Access Forbidden. You do not have permission to perform this action.';
          break;
        case 404:
          userMessage = userMessage || 'Requested resource could not be found.';
          break;
        case 409:
          userMessage = userMessage || 'Conflict detected. A record with this identifier already exists.';
          break;
        case 422:
          userMessage = userMessage || 'Validation failed. Please correct the highlighted errors.';
          break;
        case 429:
          userMessage = 'Too many requests. Please slow down and try again shortly.';
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          userMessage = 'Internal Server Error. Our engineering team has been notified.';
          break;
        default:
          userMessage = userMessage || error.message || 'An unexpected error occurred.';
      }

      console.error(`[API Error ${status}]`, { url: error.config?.url, message: userMessage, details: data?.errors });
      return Promise.reject(new ApiError(userMessage, status, data?.errors));
    } else if (error.request) {
      const netMsg = 'Network connectivity failure. Please check your internet connection.';
      console.error('[API Network Error]', error.request);
      return Promise.reject(new ApiError(netMsg, 0));
    }

    return Promise.reject(new ApiError(error.message || 'Client initialization error', 0));
  }
);
