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
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try { // Destructure userType from the 'data' property of the response
        const { data: { userType } } = await api.post(API_ROUTES.AUTH.REFRESH);
        useAuthStore.getState().setUser(userType as UserRole);
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;