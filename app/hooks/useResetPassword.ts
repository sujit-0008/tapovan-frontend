import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../services/authService';
import { ResetPasswordCredentials, ResetPasswordResponse } from '../types';
import { useRouter } from 'next/navigation';

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation<ResetPasswordResponse, Error, ResetPasswordCredentials>({
    mutationFn: resetPassword,
    onSuccess: () => {
      router.push('/login?resetSuccess=true');
    },
    onError: (error: Error & { response?: { data?: { errors?: string[] } } }) => {
      console.error('Reset password error:', error.response?.data?.errors || error.message);
    },
  });
};