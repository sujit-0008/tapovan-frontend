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
      setUser(data.userType,data.id);
      const roleRoutes: Record<string, string> = {
        STUDENT: '/studentDashboard',
        ADMIN: '/admin-dashboard',
        FACILITY_ADMIN: '/admin-dashboard',
        STAFF: '/staffDashboard',
        PARENT: '/parentDashboard',
        VENDOR: '/vendorDashboard',
        MEDICAL_VENDOR: '/medicalVendorDashboard',
        FOOD_VENDOR: '/foodVendorDashboard',
      };
      router.push(roleRoutes[data.userType] || '/dashboard');
    },
    onError: (error: Error | { response?: { data?: { errors?: string } } }) => {
      const errorMessage = 'response' in error ? error.response?.data?.errors : error instanceof Error ? error.message : 'Unknown error';
      console.error('Login error:', errorMessage);
    },
  });
};