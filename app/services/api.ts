import axios from 'axios';
import { API_ROUTES } from '../constants/api';
import { UserRole } from '../types';
import { useAuthStore } from '../store/authStore';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Enhanced error message extraction
    let errorMessage = 'An unexpected error occurred';

    if (error.response?.data) {
      const { data } = error.response;

      // Handle different error response formats
      if (data.errors && Array.isArray(data.errors)) {
        errorMessage = data.errors.join(', ');
      } else if (data.message) {
        errorMessage = data.message;
      } else if (data.error) {
        errorMessage = data.error;
      } else if (typeof data === 'string') {
        errorMessage = data;
      }
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.request) {
      errorMessage = 'Network error - please check your connection';
    }

    // Create enhanced error object
    const enhancedError = {
      ...error,
      message: errorMessage,
      status: error.response?.status,
      statusText: error.response?.statusText,
      originalMessage: error.message,
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data: { userType } } = await api.post(API_ROUTES.AUTH.REFRESH);
        useAuthStore.getState().setUser(userType as UserRole);
        return api(originalRequest);
      } catch {
        window.location.href = '/login';
        return Promise.reject(enhancedError);
      }
    }

    return Promise.reject(enhancedError);
  }
);

export default api;