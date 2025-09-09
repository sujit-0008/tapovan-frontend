import { useMutation } from '@tanstack/react-query';
import { login } from '../services/authService';
import { LoginCredentials, LoginResponse } from '../types';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.userType);
      const roleRoutes: Record<string, string> = {
        STUDENT: '/studentDashboard',
        ADMIN: '/admin-dashboard',
        FACILITY_ADMIN: '/admin-dashboard',
        STAFF: '/staffDashboard',
        PARENT: '/parentDashboard',
        VENDOR: '/vendorDashboard',
      };
      router.push(roleRoutes[data.userType] || '/dashboard');
    },
    onError: (error: any) => {
      console.error('Login error:', error.response?.data?.errors || error.message);
    },
  });
};