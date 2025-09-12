import { useMutation } from '@tanstack/react-query';
import { requestPasswordReset } from '../services/authService';
import { RequestPasswordResetCredentials, RequestPasswordResetResponse  } from '../types';
import { useRouter } from 'next/navigation';

export const useRequestPasswordReset = () => {
  const router = useRouter();

  return useMutation<RequestPasswordResetResponse, Error, RequestPasswordResetCredentials>({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      router.push('/login?resetRequested=true');
    },
    onError: (error: Error & { response?: { data?: { errors?: string } } }) => {
      console.error('Request password reset error:', error.response?.data?.errors || error.message);
    },
  });
};